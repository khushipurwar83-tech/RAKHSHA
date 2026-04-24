-- database/schema.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    emergency_pin VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Guardians Table (Self-referential Many-to-Many via junction)
CREATE TABLE guardians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    guardian_id UUID REFERENCES users(id) ON DELETE CASCADE,
    relationship VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, guardian_id)
);

-- SOS Events
CREATE TABLE sos_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    location GEOMETRY(Point, 4326),
    audio_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Safe Havens
CREATE TABLE safe_havens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'police', 'hospital', '24x7_shop'
    location GEOMETRY(Point, 4326) NOT NULL,
    address TEXT,
    contact_number VARCHAR(20),
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Reports (Crowdsourced unsafe areas)
CREATE TABLE user_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    location GEOMETRY(Point, 4326) NOT NULL,
    description TEXT,
    photo_url VARCHAR(500),
    report_time TIMESTAMP WITH TIME ZONE NOT NULL,
    severity INT DEFAULT 1, -- 1 to 5
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crime History (For predictive heatmap)
CREATE TABLE crime_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crime_type VARCHAR(100) NOT NULL,
    location GEOMETRY(Point, 4326) NOT NULL,
    date_reported TIMESTAMP WITH TIME ZONE NOT NULL,
    severity INT DEFAULT 5,
    source VARCHAR(255)
);

-- Checkins
CREATE TABLE checkins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    location GEOMETRY(Point, 4326) NOT NULL,
    status VARCHAR(50) DEFAULT 'safe', -- 'safe', 'missed', 'alert'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
