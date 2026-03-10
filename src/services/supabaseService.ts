import { supabase } from './supabaseClient';

const ensureSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase client is not initialized. Please check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  }
};

// --- Clients ---
export const fetchClients = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return data;
};

export const insertClient = async (client: any) => {
  ensureSupabase();
  const { data, error } = await supabase
    .from('clients')
    .insert([client])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateClient = async (id: string, updates: any) => {
  ensureSupabase();
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

// --- Leads ---
export const fetchLeads = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('timestamp', { ascending: false });
  if (error) throw error;
  return data;
};

export const insertLead = async (lead: any) => {
  ensureSupabase();
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateLead = async (id: string, updates: any) => {
  ensureSupabase();
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

// --- Projects ---
export const fetchProjects = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('projects')
    .select('*, clients(name)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const insertProject = async (project: any) => {
  ensureSupabase();
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateProject = async (id: string, updates: any) => {
  ensureSupabase();
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

// --- Invoices ---
export const fetchInvoices = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return data;
};

export const insertInvoice = async (invoice: any) => {
  ensureSupabase();
  const { data, error } = await supabase
    .from('invoices')
    .insert([invoice])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateInvoice = async (id: string, updates: any) => {
  ensureSupabase();
  const { data, error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

// --- Subscriptions (Rent-to-Own) ---
export const fetchSubscription = async () => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .single(); // Assuming only one subscription record for this CRM instance
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows found"
  return data;
};

export const updateSubscription = async (id: string, updates: any) => {
  ensureSupabase();
  const { data, error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

// --- Ownership Transfer Script ---
export const transferOwnership = async (subscriptionId: string) => {
  ensureSupabase();
  const { data, error } = await supabase
    .from('subscriptions')
    .update({ 
      is_fully_owned: true,
      status: 'Active',
      next_payment_due: null // No more payments needed
    })
    .eq('id', subscriptionId)
    .select();
  
  if (error) {
    console.error('Failed to transfer ownership:', error);
    throw error;
  }
  
  console.log('Ownership successfully transferred! License pings removed.');
  return data[0];
};
