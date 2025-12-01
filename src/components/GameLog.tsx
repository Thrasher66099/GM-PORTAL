'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';
import { sendChatMessage } from '@/app/actions/chat';

type LogEntry = {
    id: string;
    sender_id: string;
    type: 'chat' | 'roll' | 'system';
    content: any;
    created_at: string;
    profiles?: {
        username: string;
        avatar_url: string;
    };
};

export default function GameLog() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const params = useParams();
    const campaignId = params?.id as string;
    const scrollRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    useEffect(() => {
        if (!campaignId) return;

        // Fetch initial logs
        const fetchLogs = async () => {
            const { data, error } = await supabase
                .from('game_logs')
                .select(`
                    *,
                    profiles (
                        username,
                        avatar_url
                    )
                `)
                .eq('campaign_id', campaignId)
                .order('created_at', { ascending: true })
                .limit(50);

            if (data) {
                setLogs(data as any);
            }
        };

        fetchLogs();

        // Subscribe to new logs
        const channel = supabase
            .channel(`game_logs:${campaignId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'game_logs',
                    filter: `campaign_id=eq.${campaignId}`
                },
                async (payload) => {
                    // Fetch profile for the new log
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('username, avatar_url')
                        .eq('id', payload.new.sender_id)
                        .single();

                    const newLog = {
                        ...payload.new,
                        profiles: profile
                    };

                    setLogs(prev => [...prev, newLog as any]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [campaignId, supabase]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="flex flex-col full-height" style={{ maxHeight: '600px' }}>
            <div
                ref={scrollRef}
                className="flex-1"
                style={{
                    overflowY: 'auto',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}
            >
                {logs.length === 0 && (
                    <div style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '2rem' }}>
                        No logs yet. Start rolling!
                    </div>
                )}

                {logs.map((log) => (
                    <div key={log.id} style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                {log.profiles?.username || 'Unknown'}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                {new Date(log.created_at).toLocaleTimeString()}
                            </span>
                        </div>

                        {log.type === 'roll' ? (
                            <div className="flex items-center" style={{ gap: '0.5rem' }}>
                                <span>🎲 {log.content.message}</span>
                                <span style={{
                                    fontWeight: 'bold',
                                    color: 'var(--color-accent)',
                                    background: 'rgba(0,0,0,0.3)',
                                    padding: '0.1rem 0.4rem',
                                    borderRadius: '4px'
                                }}>
                                    {log.content.roll.result}
                                </span>
                            </div>
                        ) : (
                            <div>{log.content?.message || JSON.stringify(log.content)}</div>
                        )}
                    </div>
                ))}
            </div>

            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const input = form.elements.namedItem('message') as HTMLInputElement;
                    const message = input.value.trim();

                    if (message) {
                        input.value = ''; // Optimistic clear
                        try {
                            await sendChatMessage(campaignId, message);
                        } catch (error) {
                            console.error(error);
                            alert('Failed to send message');
                        }
                    }
                }}
                style={{
                    padding: '0.5rem',
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    gap: '0.5rem'
                }}
            >
                <input
                    type="text"
                    name="message"
                    placeholder="Type a message..."
                    className="input"
                    style={{ flex: 1 }}
                    autoComplete="off"
                />
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div>
    );
}
