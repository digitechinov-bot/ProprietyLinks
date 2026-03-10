-- Supabase SQL Schema for CRM Migration

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    total_projects INTEGER DEFAULT 0,
    total_spent DECIMAL(12, 2) DEFAULT 0.00,
    last_active TIMESTAMPTZ DEFAULT NOW(),
    status TEXT CHECK (status IN ('Active', 'Inactive', 'Lead')) DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    service TEXT,
    value DECIMAL(12, 2) DEFAULT 0.00,
    status TEXT CHECK (status IN ('New', 'Contacted', 'Closed')) DEFAULT 'New',
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    ai_qualified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    location TEXT,
    value DECIMAL(12, 2) DEFAULT 0.00,
    start_date DATE,
    status TEXT CHECK (status IN ('Planning', 'In Progress', 'Completed', 'On Hold')) DEFAULT 'Planning',
    progress INTEGER DEFAULT 0,
    notes TEXT,
    team TEXT[], -- Array of team member names or IDs
    stages JSONB DEFAULT '[]'::jsonb, -- Store stages as JSONB for flexibility
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    invoice_number TEXT UNIQUE NOT NULL,
    date DATE NOT NULL,
    due_date DATE NOT NULL,
    client_name TEXT, -- Denormalized for historical accuracy
    client_email TEXT,
    client_address TEXT,
    items JSONB DEFAULT '[]'::jsonb, -- Store line items as JSONB
    status TEXT CHECK (status IN ('Draft', 'Sent', 'Paid', 'Overdue')) DEFAULT 'Draft',
    notes TEXT,
    pdf_url TEXT,
    total_amount DECIMAL(12, 2) DEFAULT 0.00,
    tax_amount DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions (Rent-to-Own Layer)
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    monthly_rate DECIMAL(12, 2) NOT NULL,
    total_paid DECIMAL(12, 2) DEFAULT 0.00,
    buyout_price DECIMAL(12, 2) NOT NULL,
    is_fully_owned BOOLEAN DEFAULT FALSE,
    last_payment_date TIMESTAMPTZ,
    next_payment_due TIMESTAMPTZ,
    status TEXT CHECK (status IN ('Active', 'Past Due', 'Cancelled')) DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
