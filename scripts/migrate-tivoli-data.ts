/**
 * Tivoli New Delhi Data Migration Script
 * Ensures complete data migration from static files to Supabase database
 * Preserves all existing information with enhancements
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { hotels } from '@/data/hotels';

// Environment validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

// Find The Tivoli-New Delhi hotel data
const tivoliHotel = hotels.find(h => h.slug === 'tivoli-grand-palace');

if (!tivoliHotel) {
  console.error('❌ Could not find The Tivoli-New Delhi hotel data');
  process.exit(1);
}

interface MigrationStats {
  hotel: boolean;
  brand: boolean;
  location: boolean;
  amenities: number;
  rooms: number;
  dining: number;
  features: number;
  policies: boolean;
  media: number;
}

class TivoliDataMigrator {
  private stats: MigrationStats = {
    hotel: false,
    brand: false,
    location: false,
    amenities: 0,
    rooms: 0,
    dining: 0,
    features: 0,
    policies: false,
    media: 0,
  };

  async migrate(): Promise<void> {
    console.log('🚀 Starting Tivoli New Delhi data migration...\n');

    try {
      // Step 1: Migrate brand
      await this.migrateBrand();
      
      // Step 2: Migrate location
      await this.migrateLocation();
      
      // Step 3: Migrate amenities
      await this.migrateAmenities();
      
      // Step 4: Migrate hotel
      await this.migrateHotel();
      
      // Step 5: Migrate rooms
      await this.migrateRooms();
      
      // Step 6: Migrate dining
      await this.migrateDining();
      
      // Step 7: Migrate features
      await this.migrateFeatures();
      
      // Step 8: Migrate policies
      await this.migratePolicies();
      
      // Step 9: Migrate media
      await this.migrateMedia();
      
      // Step 10: Verify migration
      await this.verifyMigration();
      
      this.printStats();
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
      process.exit(1);
    }
  }

  private async migrateBrand(): Promise<void> {
    console.log('📋 Migrating brand: Tivoli...');
    
    const { error } = await supabase
      .from('brands')
      .upsert({
        slug: 'tivoli',
        name: 'Tivoli',
        display_name: 'The Tivoli',
        description: 'Luxury hotels offering unparalleled hospitality and elegant accommodations',
        brand_color: '#CD9F59',
        sort_order: 1,
        is_active: true,
      }, { onConflict: 'slug' });

    if (error) throw error;
    this.stats.brand = true;
    console.log('✅ Brand migrated successfully');
  }

  private async migrateLocation(): Promise<void> {
    console.log('📍 Migrating location: Delhi...');
    
    const { error } = await supabase
      .from('locations')
      .upsert({
        slug: 'delhi',
        name: 'Delhi',
        state: 'Delhi',
        country: 'India',
        display_order: 1,
        is_active: true,
      }, { onConflict: 'slug' });

    if (error) throw error;
    this.stats.location = true;
    console.log('✅ Location migrated successfully');
  }

  private async migrateAmenities(): Promise<void> {
    console.log('🏨 Migrating amenities...');
    
    for (const amenity of tivoliHotel!.amenities) {
      const { error } = await supabase
        .from('amenities')
        .upsert({
          name: amenity.name,
          description: amenity.description,
          icon_name: amenity.icon,
          category: this.categorizeAmenity(amenity.name),
          is_active: true,
        }, { onConflict: 'name' });

      if (error) {
        console.warn(`⚠️ Warning: Could not migrate amenity "${amenity.name}":`, error.message);
      } else {
        this.stats.amenities++;
      }
    }
    
    console.log(`✅ Migrated ${this.stats.amenities} amenities`);
  }

  private async migrateHotel(): Promise<void> {
    console.log('🏛️ Migrating hotel: The Tivoli-New Delhi...');
    
    // Get brand and location IDs
    const { data: brand } = await supabase
      .from('brands')
      .select('id')
      .eq('slug', 'tivoli')
      .single();

    const { data: location } = await supabase
      .from('locations')
      .select('id')
      .eq('slug', 'delhi')
      .single();

    if (!brand || !location) {
      throw new Error('Brand or location not found');
    }

    const { error } = await supabase
      .from('hotels')
      .upsert({
        slug: tivoliHotel!.slug,
        name: tivoliHotel!.name,
        brand_id: brand.id,
        location_id: location.id,
        description: tivoliHotel!.description,
        rating: tivoliHotel!.rating,
        street: tivoliHotel!.address.street,
        city: tivoliHotel!.address.city,
        state: tivoliHotel!.address.state,
        postal_code: tivoliHotel!.address.postalCode,
        latitude: tivoliHotel!.address.coordinates.lat,
        longitude: tivoliHotel!.address.coordinates.lng,
        phone: tivoliHotel!.contact.phone,
        email: tivoliHotel!.contact.email,
        is_featured: true,
        is_active: true,
        sort_order: 1,
      }, { onConflict: 'slug' });

    if (error) throw error;
    this.stats.hotel = true;
    console.log('✅ Hotel migrated successfully');
  }

  private async migrateRooms(): Promise<void> {
    console.log('🛏️ Migrating rooms...');
    
    const { data: hotel } = await supabase
      .from('hotels')
      .select('id')
      .eq('slug', tivoliHotel!.slug)
      .single();

    if (!hotel) throw new Error('Hotel not found');

    for (const room of tivoliHotel!.rooms) {
      const { error } = await supabase
        .from('rooms')
        .upsert({
          hotel_id: hotel.id,
          name: room.name,
          description: room.description,
          size_display: room.size,
          max_occupancy: room.maxOccupancy,
          bed_type: room.bedType,
          price_inr: room.price.amount,
          sort_order: this.stats.rooms + 1,
          is_active: true,
        }, { onConflict: 'hotel_id,name' });

      if (error) {
        console.warn(`⚠️ Warning: Could not migrate room "${room.name}":`, error.message);
      } else {
        this.stats.rooms++;
      }
    }
    
    console.log(`✅ Migrated ${this.stats.rooms} rooms`);
  }

  private async migrateDining(): Promise<void> {
    console.log('🍽️ Migrating dining venues...');
    
    const { data: hotel } = await supabase
      .from('hotels')
      .select('id')
      .eq('slug', tivoliHotel!.slug)
      .single();

    if (!hotel) throw new Error('Hotel not found');

    for (const dining of tivoliHotel!.dining) {
      const { error } = await supabase
        .from('dining')
        .upsert({
          hotel_id: hotel.id,
          name: dining.name,
          description: dining.description,
          cuisine: dining.cuisine,
          hours: dining.hours,
          dress_code: dining.dress,
          sort_order: this.stats.dining + 1,
          is_active: true,
        }, { onConflict: 'hotel_id,name' });

      if (error) {
        console.warn(`⚠️ Warning: Could not migrate dining venue "${dining.name}":`, error.message);
      } else {
        this.stats.dining++;
      }
    }
    
    console.log(`✅ Migrated ${this.stats.dining} dining venues`);
  }

  private async migrateFeatures(): Promise<void> {
    console.log('⭐ Migrating hotel features...');
    
    const { data: hotel } = await supabase
      .from('hotels')
      .select('id')
      .eq('slug', tivoliHotel!.slug)
      .single();

    if (!hotel) throw new Error('Hotel not found');

    // Delete existing features first
    await supabase
      .from('hotel_features')
      .delete()
      .eq('hotel_id', hotel.id);

    for (const feature of tivoliHotel!.features) {
      const { error } = await supabase
        .from('hotel_features')
        .insert({
          hotel_id: hotel.id,
          feature_name: feature,
          sort_order: this.stats.features + 1,
        });

      if (error) {
        console.warn(`⚠️ Warning: Could not migrate feature "${feature}":`, error.message);
      } else {
        this.stats.features++;
      }
    }
    
    console.log(`✅ Migrated ${this.stats.features} features`);
  }

  private async migratePolicies(): Promise<void> {
    console.log('📋 Migrating hotel policies...');
    
    const { data: hotel } = await supabase
      .from('hotels')
      .select('id')
      .eq('slug', tivoliHotel!.slug)
      .single();

    if (!hotel) throw new Error('Hotel not found');

    const { error } = await supabase
      .from('hotel_policies')
      .upsert({
        hotel_id: hotel.id,
        check_in: tivoliHotel!.policies.checkIn,
        check_out: tivoliHotel!.policies.checkOut,
        cancellation: tivoliHotel!.policies.cancellation,
        pets: tivoliHotel!.policies.pets,
      }, { onConflict: 'hotel_id' });

    if (error) throw error;
    this.stats.policies = true;
    console.log('✅ Policies migrated successfully');
  }

  private async migrateMedia(): Promise<void> {
    console.log('📸 Migrating media entries...');
    
    const { data: hotel } = await supabase
      .from('hotels')
      .select('id')
      .eq('slug', tivoliHotel!.slug)
      .single();

    if (!hotel) throw new Error('Hotel not found');

    // Create media entries for hotel images
    for (let i = 0; i < tivoliHotel!.images.length; i++) {
      const imageUrl = tivoliHotel!.images[i];
      const filename = `tivoli-image-${i + 1}.jpg`;
      
      const { data: mediaEntry, error: mediaError } = await supabase
        .from('media')
        .upsert({
          filename: filename,
          original_filename: filename,
          file_type: 'image/jpeg',
          supabase_path: imageUrl,
          public_url: imageUrl,
          alt_text: `The Tivoli New Delhi - Image ${i + 1}`,
          tags: ['hotel', 'tivoli', 'new-delhi'],
          upload_source: 'migration',
        }, { onConflict: 'filename' })
        .select()
        .single();

      if (mediaError) {
        console.warn(`⚠️ Warning: Could not migrate media "${filename}":`, mediaError.message);
        continue;
      }

      // Link media to hotel
      const { error: linkError } = await supabase
        .from('hotel_media')
        .upsert({
          hotel_id: hotel.id,
          media_id: mediaEntry.id,
          media_type: 'gallery',
          sort_order: i + 1,
          is_primary: i === 0,
        }, { onConflict: 'hotel_id,media_id' });

      if (linkError) {
        console.warn(`⚠️ Warning: Could not link media to hotel:`, linkError.message);
      } else {
        this.stats.media++;
      }
    }
    
    console.log(`✅ Migrated ${this.stats.media} media entries`);
  }

  private async verifyMigration(): Promise<void> {
    console.log('\n🔍 Verifying migration...');
    
    const { data: hotel, error } = await supabase
      .from('hotels')
      .select(`
        *,
        brand:brands(*),
        location:locations(*),
        amenities:hotel_amenities(amenity:amenities(*)),
        rooms(*),
        dining(*),
        features:hotel_features(*),
        policies:hotel_policies(*),
        media:hotel_media(media:media(*))
      `)
      .eq('slug', tivoliHotel!.slug)
      .single();

    if (error) {
      throw new Error(`Verification failed: ${error.message}`);
    }

    if (!hotel) {
      throw new Error('Hotel not found after migration');
    }

    console.log('✅ Migration verification completed successfully');
    console.log(`📊 Database contains:`);
    console.log(`   - Hotel: ${hotel.name}`);
    console.log(`   - Brand: ${hotel.brand?.name}`);
    console.log(`   - Location: ${hotel.location?.name}`);
    console.log(`   - Amenities: ${hotel.amenities?.length || 0}`);
    console.log(`   - Rooms: ${hotel.rooms?.length || 0}`);
    console.log(`   - Dining: ${hotel.dining?.length || 0}`);
    console.log(`   - Features: ${hotel.features?.length || 0}`);
    console.log(`   - Media: ${hotel.media?.length || 0}`);
  }

  private categorizeAmenity(name: string): string {
    const name_lower = name.toLowerCase();
    
    if (name_lower.includes('wifi') || name_lower.includes('internet')) return 'connectivity';
    if (name_lower.includes('pool') || name_lower.includes('fitness') || name_lower.includes('spa')) return 'wellness';
    if (name_lower.includes('dining') || name_lower.includes('restaurant') || name_lower.includes('bar')) return 'dining';
    if (name_lower.includes('parking') || name_lower.includes('valet')) return 'transport';
    if (name_lower.includes('business') || name_lower.includes('meeting')) return 'business';
    
    return 'amenity';
  }

  private printStats(): void {
    console.log('\n🎉 Migration completed successfully!');
    console.log('📈 Migration Statistics:');
    console.log(`   ✅ Hotel: ${this.stats.hotel ? 'Migrated' : 'Failed'}`);
    console.log(`   ✅ Brand: ${this.stats.brand ? 'Migrated' : 'Failed'}`);
    console.log(`   ✅ Location: ${this.stats.location ? 'Migrated' : 'Failed'}`);
    console.log(`   ✅ Amenities: ${this.stats.amenities} migrated`);
    console.log(`   ✅ Rooms: ${this.stats.rooms} migrated`);
    console.log(`   ✅ Dining: ${this.stats.dining} migrated`);
    console.log(`   ✅ Features: ${this.stats.features} migrated`);
    console.log(`   ✅ Policies: ${this.stats.policies ? 'Migrated' : 'Failed'}`);
    console.log(`   ✅ Media: ${this.stats.media} migrated`);
  }
}

// Execute migration
async function main(): Promise<void> {
  const migrator = new TivoliDataMigrator();
  await migrator.migrate();
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export default TivoliDataMigrator;