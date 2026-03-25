-- Enable pg_cron extension (required for scheduled jobs)
create extension if not exists pg_cron with schema extensions;

-- Enable pg_net extension (required for HTTP calls from cron)
create extension if not exists pg_net with schema extensions;

-- Remove existing job if it exists
select cron.unschedule('refresh-instagram-data') 
where exists (
  select 1 from cron.job where jobname = 'refresh-instagram-data'
);

-- Schedule Instagram data refresh every 2 days at 3:00 AM UTC
select cron.schedule(
  'refresh-instagram-data',
  '0 3 */2 * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'SUPABASE_URL') || '/functions/v1/fetch-instagram-data',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'SUPABASE_SERVICE_ROLE_KEY')
    ),
    body := '{}'::jsonb
  );
  $$
);
