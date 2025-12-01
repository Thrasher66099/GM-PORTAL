import MapViewer from '@/components/MapViewer';

export default function MapPage() {
    return (
        <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
            <h1 style={{ marginBottom: '1rem' }}>Dungeon Map</h1>
            <div style={{ flex: 1 }}>
                <MapViewer />
            </div>
        </div>
    );
}
