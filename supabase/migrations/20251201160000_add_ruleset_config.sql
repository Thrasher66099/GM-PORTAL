-- Add ruleset_config to campaigns
alter table campaigns add column ruleset_config jsonb default '{
  "stats": [
    {"key": "str", "label": "Strength", "type": "number", "min": 1, "max": 20},
    {"key": "dex", "label": "Dexterity", "type": "number", "min": 1, "max": 20},
    {"key": "con", "label": "Constitution", "type": "number", "min": 1, "max": 20},
    {"key": "int", "label": "Intelligence", "type": "number", "min": 1, "max": 20},
    {"key": "wis", "label": "Wisdom", "type": "number", "min": 1, "max": 20},
    {"key": "cha", "label": "Charisma", "type": "number", "min": 1, "max": 20}
  ],
  "skills": [],
  "vitals": [
    {"key": "hp", "label": "Hit Points", "type": "number", "min": 0, "max": 999},
    {"key": "ac", "label": "Armor Class", "type": "number", "min": 0, "max": 99}
  ]
}';
