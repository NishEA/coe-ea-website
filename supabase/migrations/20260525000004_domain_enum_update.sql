-- Add the four IoT domains that were in the DPR source but missing from the
-- initial enum definition. IF NOT EXISTS keeps this idempotent on re-runs.
ALTER TYPE application_domain ADD VALUE IF NOT EXISTS 'home_office_automation';
ALTER TYPE application_domain ADD VALUE IF NOT EXISTS 'weather_monitoring';
ALTER TYPE application_domain ADD VALUE IF NOT EXISTS 'smart_hospital';
ALTER TYPE application_domain ADD VALUE IF NOT EXISTS 'smart_security';
