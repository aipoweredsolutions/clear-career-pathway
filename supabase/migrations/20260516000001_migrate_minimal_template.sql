-- Migration: Migrate 'ats-minimal' documents to 'ats-minimal-mono'
-- Reason: Template consolidation with font-toggle support
-- Date: 2026-05-16

UPDATE documents 
SET template_id = 'ats-minimal-mono' 
WHERE template_id = 'ats-minimal';
