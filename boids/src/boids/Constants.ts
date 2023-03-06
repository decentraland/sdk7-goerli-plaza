
class BoidConfig{
    ENABLED:boolean = true
    
    AREA_SCALE:number = 1/80
    FORCE_SCALE:number = 1//.05
    MAX_SPEED_SCALE:number = .02    
    
    // see debug markers for seek/obsticle/predator
    VISIBLE_OBSTACLES:boolean = false 
    VISIBLE_SEEK:boolean = false 
    VISIBLE_PREDATOR:boolean = false

    // see boundary grid markers
    SHOW_DEBUG_BOUNDARY_MARKERS:boolean = false
    // see boundary planes (top,bottom)
    SHOW_DEBUG_BOUNDARY_PLANES:boolean = false

    AVOID_RADIUS = 1
    SEEK_RADIUS = 1
    //COHESION_RADIUS = -.2

    ALIGNMENT_WEIGHT = 1
    COHESION_WEIGHT = 1
    SEPARATION_WEIGHT = 1 
}

export const BOID_CONFIG = new BoidConfig();