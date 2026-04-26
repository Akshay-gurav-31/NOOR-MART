-- ==========================================
-- NOOR MART MASTER DATABASE SETUP
-- ==========================================
-- This file contains EVERYTHING needed:
-- 1. Table Structures
-- 2. Security (RLS) Policies
-- 3. All 14 Premium Seed Products
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CREATE TABLES
-- ------------------------------------------

-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category TEXT,
    gender TEXT,
    stock_quantity INTEGER DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENSURE COLUMNS EXIST (For existing tables)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category TEXT;

-- ENSURE UNIQUE CONSTRAINT EXISTS
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_name_key') THEN
        ALTER TABLE public.products ADD CONSTRAINT products_name_key UNIQUE (name);
    END IF;
END $$;

-- Profiles Table (for user accounts)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart Items Table
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SECURITY (RLS)
-- ------------------------------------------

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items DISABLE ROW LEVEL SECURITY;

-- Product Policies (Everyone can view)
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);

-- Profile Policies (Users see only their own)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. SEED ALL 16 PRODUCTS
-- ------------------------------------------

INSERT INTO public.products (name, description, price, image_url, category, gender)
VALUES 
('Ivory Silk Anarkali', 'A floor-length ivory silk anarkali with delicate gold embroidery.', 32000, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800', 'Dress', 'Women'),
('Midnight Velvet Saree', 'Deep midnight blue velvet saree with silver hand-work.', 28000, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800', 'Ethnic', 'Women'),
('Pashmina Overlay Dress', 'A contemporary wrap dress crafted from fine pashmina wool.', 19500, 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800', 'Dress', 'Women'),
('Architectural Shift Dress', 'Clean lines and structured form in heavy Banarasi silk.', 24000, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800', 'Dress', 'Women'),
('Fluid Drape Dress', 'Asymmetrical drape dress in organic mulberry silk.', 21000, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800', 'Dress', 'Women'),
('Royal Raw Silk Sherwani', 'Structured raw silk sherwani for formal occasions.', 48000, 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=800', 'Occasion Wear', 'Men'),
('Linen Bundi Jacket', 'A lightweight linen bundi jacket for layered elegance.', 12500, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800', 'Fusion', 'Men'),
('Heritage Kurta Pajama', 'Classic hand-woven cotton kurta with tailored pajama.', 8200, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800', 'Luxury Daily', 'Men'),
('Zardozi Silk Saree', 'A masterpiece in heavy silk with intricate hand-embroidered zardozi patterns.', 35000, 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800', 'Ethnic', 'Women'),
('Tussar Silk Kurta', 'Raw Tussar silk kurta in a natural gold hue, perfect for day celebrations.', 15500, 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800', 'Luxury Daily', 'Men'),
('Draped Chiffon Gown', 'An ethereal gown with fluid asymmetrical drapes in layered chiffon.', 26500, 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800', 'Dress', 'Women'),
('Structured Linen Blazer', 'A tailored linen blazer with architectural shoulders and raw-edge finish.', 18000, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800', 'Fusion', 'Men'),
('Organic Hemp Tunic', 'A minimalist tunic crafted from sustainable organic hemp fibers.', 8500, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800', 'Sustainable', 'Women'),
('Indigo Dabu Jacket', 'Hand-blocked indigo jacket using traditional Rajasthani Dabu printing.', 12000, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800', 'Sustainable', 'Men'),
('Kashmiri Silk Kaftan', 'A flowing silk kaftan with traditional Kashmiri Aari embroidery.', 22500, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800', 'Ethnic', 'Women'),
('Modern Bandhgala Suit', 'A contemporary take on the classic Bandhgala, tailored in premium wool.', 38000, 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800', 'Occasion Wear', 'Men'),
('Threadwork Denim Jacket', 'A luxury denim jacket featuring intricate hand-threadwork patterns.', 14500, 'https://images.unsplash.com/photo-1481822423873-578ebc12175b?q=80&w=800', 'Fusion', 'Women'),
('Hand-painted Silk Scarf', 'A large silk scarf featuring hand-painted Mughal floral motifs.', 6800, 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=800', 'Accessories', 'Unisex')
ON CONFLICT (name) DO NOTHING;
