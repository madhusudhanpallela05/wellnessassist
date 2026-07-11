import type { WorkoutExplanation } from "../components/WorkoutExplanationModal";

/*
  Each key = exact workout name (must match the `name` field in WellnessHub).
  The function receives the user's profile data to personalise the copy.
*/

type Profile = {
  bmi: number;
  name: string;
  weight: number;
  height: number;
  gender: string;
};

function first(name: string) {
  return name.split(" ")[0];
}

export function getWorkoutExplanation(
  workoutName: string,
  profile: Profile
): WorkoutExplanation {
  const p = first(profile.name);
  const bmi = profile.bmi.toFixed(1);

  const map: Record<string, WorkoutExplanation> = {

    /* ══════════════════════════════════════════════════════
       UNDERWEIGHT workouts
    ══════════════════════════════════════════════════════ */

    "Bodyweight Strength Circuit": {
      whatItIs:
        "A Bodyweight Strength Circuit is a structured series of compound exercises — typically push-ups, squats, lunges, dips, and glute bridges — performed back-to-back with minimal rest. Each exercise uses your own body weight as resistance, stimulating multiple muscle groups simultaneously without any equipment. A typical circuit lasts 35–40 minutes and cycles through 4–6 exercises for 3 rounds.",
      whyForYou:
        `${p}, with your BMI of ${bmi} you fall into the underweight category, which means your primary goal is building lean muscle mass rather than losing fat. Bodyweight training is ideal at this stage because it creates a strong neuromuscular foundation — training your nervous system to recruit muscle fibres effectively — before you progress to external weights. Unlike cardio-heavy workouts, this circuit burns a moderate ${profile.bmi < 18 ? "~200" : "~210"} kcal while providing a strong muscle-building stimulus, so you gain mass without creating an excessive caloric deficit.`,
      howToPerform: [
        "Start with a 5-minute dynamic warm-up: arm circles, leg swings, hip rotations, and 30 seconds of light jumping jacks.",
        "Round 1 — Push-ups: 10–15 reps. Keep your core tight, hands shoulder-width apart, lower chest to 2cm above the floor.",
        "Bodyweight Squats: 15–20 reps. Feet hip-width, toes slightly outward, sit back as if lowering to a chair, keep chest proud.",
        "Reverse Lunges: 10 reps each leg. Step backward, lower the back knee to just above the floor, drive through the front heel to stand.",
        "Tricep Dips (using a chair): 10–12 reps. Hands on chair edge, fingers forward, lower body until elbows reach 90°.",
        "Glute Bridges: 15 reps. Lie on back, feet flat, drive hips toward the ceiling, squeeze glutes at the top for 1 second.",
        "Rest 60–90 seconds between rounds. Complete 3 rounds total.",
        "Cool down with 5 minutes of static stretching — hold each stretch 20–30 seconds.",
      ],
      musclesTargeted:
        "Push-ups target the pectorals (chest), anterior deltoids (front shoulders), and triceps. Squats and lunges engage the quadriceps, hamstrings, glutes, and calves. Dips isolate the triceps and lower chest. Glute bridges activate the glutes and hamstrings specifically. Together, this circuit trains virtually every major muscle group in one session, making it highly efficient for full-body muscle development.",
      benefits: [
        `Builds lean muscle mass — the primary goal for your BMI of ${bmi}`,
        "Improves neuromuscular coordination, preparing your body for heavier lifting later",
        "Increases basal metabolic rate (BMR), meaning you burn more calories at rest as you gain muscle",
        "Strengthens connective tissue (tendons and ligaments) progressively without injury risk",
        "Boosts testosterone and growth hormone naturally through compound movement patterns",
        "Burns ~210 kcal in 35 minutes — enough to support body composition without over-depleting calories",
      ],
      safetyTips: [
        "Do NOT skip the warm-up — cold muscles are far more prone to strains during explosive movements like push-ups.",
        "For push-ups, avoid letting your hips sag or pike up — your body should form a straight line from head to heels.",
        "On squats, never let your knees collapse inward (valgus collapse) — push knees outward over your toes throughout the movement.",
        "If you feel any sharp pain in your joints (not muscle burn), stop immediately and reassess your form.",
        "Rest at least 48 hours before training the same muscle groups again to allow muscle protein synthesis.",
      ],
      progression:
        `${p}, start with 3 rounds of 10 reps per exercise for the first 2 weeks. Once all 3 rounds feel manageable, increase to 15 reps. After 4 weeks, add a 4th round. At week 6, introduce a weighted backpack (2–5 kg) to your squats and lunges. By week 8, you'll be ready to transition into Progressive Dumbbell Training for continued muscle growth. Track your reps in a notebook — seeing progress written down is a powerful motivator.`,
    },

    "Progressive Dumbbell Training": {
      whatItIs:
        "Progressive Dumbbell Training is a structured resistance workout using free weights (dumbbells) with the principle of progressive overload — gradually increasing weight, reps, or sets over time to continuously challenge your muscles. The session typically includes compound lifts (Romanian deadlifts, dumbbell rows, chest press, shoulder press) and isolation movements (bicep curls, lateral raises). It lasts 40 minutes and is far more effective for muscle hypertrophy (growth) than bodyweight training alone.",
      whyForYou:
        `${p}, at a BMI of ${bmi} your body needs a significant anabolic (muscle-building) stimulus paired with adequate nutrition. Dumbbells allow unilateral training (one arm/leg at a time), which fixes muscular imbalances that are common in underweight individuals. Compound dumbbell lifts like the Romanian deadlift trigger the release of growth hormone and testosterone — your most powerful muscle-building hormones. At your current weight, using 5–10 kg dumbbells is the ideal starting point, with room to progress to 15 kg as you get stronger.`,
      howToPerform: [
        "Warm up with 5 minutes of light movement: hip hinges, shoulder circles, and 10 bodyweight squats.",
        "Dumbbell Romanian Deadlift: Hold dumbbells in front of thighs, hinge at hips with a soft knee bend, lower weights along your shins, feel a hamstring stretch, then drive hips forward to stand. 3 sets × 10 reps.",
        "Dumbbell Bent-Over Row: Hinge to 45°, pull dumbbells toward your lower ribcage, lead with your elbows, squeeze shoulder blades together at the top. 3 sets × 10 reps each side.",
        "Dumbbell Chest Press (on floor or bench): Lower dumbbells to chest level, press explosively, don't lock elbows fully at the top. 3 sets × 10 reps.",
        "Dumbbell Shoulder Press: Start at ear height, press straight up, lower slowly. 3 sets × 10 reps.",
        "Bicep Curl + Tricep Kickback superset: Curl to shoulder, then hinge forward and extend arm behind you. 2 sets × 12 reps each.",
        "Rest 60–90 seconds between sets. Finish with 5 minutes of static stretching.",
      ],
      musclesTargeted:
        "Romanian Deadlifts primarily target the hamstrings, glutes, and lower back (erector spinae). Rows activate the latissimus dorsi (back), rhomboids, and biceps. Chest press works the pectorals, triceps, and anterior deltoids. Shoulder press targets the medial and anterior deltoids, and upper trapezius. Bicep curls isolate the biceps brachii; tricep kickbacks isolate the triceps. This session creates balanced upper and lower body development critical for healthy weight gain.",
      benefits: [
        "Triggers muscle hypertrophy — the most direct route to healthy weight gain for your BMI",
        "Increases bone mineral density, reducing long-term osteoporosis risk",
        "Progressive overload ensures you never plateau — continued adaptation over months and years",
        "Improves insulin sensitivity, meaning carbohydrates are directed to muscles rather than fat cells",
        "Burns ~240 kcal in 40 minutes — moderate enough to support a caloric surplus for weight gain",
        "Builds functional strength that translates to daily life activities",
      ],
      safetyTips: [
        "Never sacrifice form for heavier weight — a rounded lower back during deadlifts is the most common injury cause.",
        "Choose a weight that makes reps 8–10 challenging but not impossible. If you can easily do 15, increase the weight.",
        "Breathe out on the effort (lifting) phase, breathe in on the lowering phase — never hold your breath.",
        "Keep dumbbells close to your body throughout all pulling movements to protect your shoulder joints.",
        "Do NOT train to complete failure every set — stop 1–2 reps before failure for sustainable progress without overtraining.",
      ],
      progression:
        `${p}, apply the 'double progression' method: once you can complete all prescribed sets at the high end of the rep range (e.g. 12 reps), increase the dumbbell weight by 1–2 kg the following session. Aim to add weight every 1–2 weeks. After 6–8 weeks, add a 4th set to your main compound lifts. After 3 months of consistent training, consider moving to a barbell programme (if available) for even greater strength and mass gains.`,
    },

    /* ══════════════════════════════════════════════════════
       HEALTHY BMI workouts
    ══════════════════════════════════════════════════════ */

    "Interval Running (5K Prep)": {
      whatItIs:
        "Interval Running (5K Prep) alternates between periods of moderate jogging and higher-intensity sprinting within a single 30-minute session. A typical structure is a 5-minute easy warm-up jog, then 20 minutes of intervals (2 minutes at comfortable jogging pace followed by 1 minute at near-maximum sprint), and a 5-minute cool-down walk. This method — known as High-Intensity Interval Training (HIIT) applied to running — is scientifically proven to improve cardiovascular fitness dramatically faster than steady-state jogging alone.",
      whyForYou:
        `${p}, your BMI of ${bmi} sits in the healthy range, meaning your cardiovascular system can safely handle moderate-to-high intensity exercise without joint stress concerns. Interval running is particularly powerful at your fitness level because it targets VO₂ max — your body's maximum oxygen consumption capacity — which is the single best predictor of long-term cardiovascular health. Studies show interval training improves VO₂ max 2× faster than slow steady jogging. At your body weight, you burn approximately 320 kcal in 30 minutes of intervals — significantly more than a 30-minute easy run.`,
      howToPerform: [
        "Start with a 5-minute brisk walk, gradually increasing to a light jog to prime your cardiovascular system and lubricate joints.",
        "Begin your first interval: jog at a comfortable conversational pace (you can speak in sentences) for 2 full minutes.",
        "Increase to a hard sprint for 1 minute — aim for 85–95% of your maximum effort. You should NOT be able to hold a conversation.",
        "Immediately drop back to your comfortable jog for 2 minutes to recover.",
        "Repeat the 2-min jog / 1-min sprint cycle for a total of 6–7 rounds (approximately 18–21 minutes of intervals).",
        "Finish with a 5-minute easy walk to bring your heart rate gradually back to normal.",
        "Perform light leg stretching after: quadricep stretch, hamstring stretch, calf stretch — 30 seconds each side.",
      ],
      musclesTargeted:
        "Running primarily engages the quadriceps (front of thighs), hamstrings (back of thighs), gluteus maximus and medius (buttocks), gastrocnemius and soleus (calves), and hip flexors. Sprint intervals additionally recruit the core musculature (rectus abdominis, obliques, transverse abdominis) for trunk stabilisation, and the tibialis anterior (shin) for foot clearance. The cardiovascular system — heart, lungs, and circulatory network — is the primary system being trained and adapted.",
      benefits: [
        "Improves VO₂ max by up to 15% over 8 weeks — the gold standard of cardiovascular fitness",
        `Burns ~320 kcal in 30 minutes — significantly higher than steady-state jogging at your weight`,
        "Creates an 'afterburn effect' (EPOC) — you continue burning elevated calories for up to 24 hours post-session",
        "Reduces resting heart rate over time — a lower resting HR indicates a more efficient, healthier heart",
        "Builds running economy, making each step more fuel-efficient and less effortful",
        "Prepares your body to comfortably complete a 5K run within 8–10 weeks of consistent training",
      ],
      safetyTips: [
        "Never skip the warm-up jog — starting at sprint pace cold is the leading cause of hamstring strains.",
        "If you feel a sharp stitch in your side, slow to a walk and focus on deep belly breathing until it passes.",
        "Land mid-foot rather than heel-striking during sprints — heel striking creates braking force that stresses the knee joint.",
        "Do NOT run intervals on consecutive days — allow at least 1 day of rest or light activity between sessions.",
        "If you experience any chest pain, dizziness, or extreme breathlessness, stop immediately and consult a doctor.",
      ],
      progression:
        `${p}, for the first 2 weeks, use a 2:1 jog-to-sprint ratio (2 min easy, 1 min hard). In weeks 3–4, reduce your jog recovery to 90 seconds. By weeks 5–6, push your sprint intervals to 90 seconds. At week 8, attempt a continuous 5K run — you'll likely surprise yourself. Long-term, you can add a 4th running day per week and introduce hill intervals or track workouts to further challenge your cardiovascular system.`,
    },

    "Full-Body Resistance Training": {
      whatItIs:
        "Full-Body Resistance Training is a structured strength session where every major muscle group — legs, back, chest, shoulders, arms, and core — is trained in a single 45-minute workout. Using a barbell, resistance bands, or both, the session focuses on multi-joint compound movements that recruit the maximum number of muscle fibres per exercise. Unlike isolation training (working one muscle at a time), compound resistance training delivers significantly higher anabolic hormone responses and calorie burn per minute.",
      whyForYou:
        `${p}, maintaining a healthy BMI of ${bmi} long-term requires more than just cardio — resistance training is essential for preserving lean muscle mass, which naturally declines with age without deliberate training. Your current BMI indicates a good body composition baseline, and resistance training will ensure that stays true as you get older. Additionally, increased muscle mass raises your basal metabolic rate (BMR), meaning you burn more calories at rest, making it easier to maintain your healthy weight without rigid dietary restriction.`,
      howToPerform: [
        "Warm up with 5 minutes of dynamic movement: leg swings, arm circles, hip circles, and 10 bodyweight squats.",
        "Barbell / Band Squat: 3 sets × 10–12 reps. Keep back straight, chest up, push knees out over toes, reach parallel depth.",
        "Barbell / Band Deadlift: 3 sets × 8 reps. Feet hip-width, hinge at hips, keep bar close to shins, drive through heels.",
        "Bent-Over Row: 3 sets × 10 reps. Hinge to 45°, pull bar/bands to lower ribcage, lead with elbows, full stretch at bottom.",
        "Overhead Press: 3 sets × 10 reps. Press from chin height, lock out elbows overhead, lower with control.",
        "Push-ups or Chest Press: 3 sets × 10–12 reps. Full range of motion, 2-second descent.",
        "Plank Hold: 3 × 30–45 seconds. Straight body line, breathe steadily, don't let hips sag.",
        "Cool down: 5 minutes of thoracic spine mobility and hip flexor stretches.",
      ],
      musclesTargeted:
        "Squats and deadlifts target the quadriceps, hamstrings, glutes, and erector spinae (lower back). Rows develop the latissimus dorsi, rhomboids, and biceps. Overhead press builds the deltoids and triceps. Push-ups/chest press work the pectorals and anterior deltoids. Planks activate the entire core — rectus abdominis, obliques, transverse abdominis, and deep stabiliser muscles. Together, this covers all 600+ muscles across the body's major functional movement patterns.",
      benefits: [
        `Preserves and builds lean muscle mass, protecting your healthy BMI of ${bmi} long-term`,
        "Raises basal metabolic rate — each kg of muscle burns ~13 kcal/day at rest vs ~4 kcal/kg of fat",
        "Improves bone density, reducing osteoporosis risk by up to 40%",
        "Enhances insulin sensitivity — your cells absorb glucose more efficiently, protecting against type 2 diabetes",
        "Reduces all-cause mortality risk by up to 23% (strength training, American Heart Association research)",
        "Improves posture, reduces chronic back pain, and increases daily functional strength",
      ],
      safetyTips: [
        "Master the bodyweight version of each movement before adding external load — form breaks down under heavy weights.",
        "For deadlifts, maintain a neutral spine throughout — never round your lower back when the weight is heavy.",
        "Resistance bands: check for nicks or tears before each session — a snapping band can cause serious injury.",
        "Rest 48–72 hours between full-body sessions to allow complete muscle protein synthesis and recovery.",
        "Increase weight no more than 5–10% per week to avoid tendon overload (muscles adapt faster than tendons).",
      ],
      progression:
        `${p}, start at a weight where the last 2 reps of each set feel genuinely challenging (RPE 8/10). Add weight when you can complete all reps cleanly for 2 consecutive sessions. After 4 weeks, consider splitting into upper/lower sessions (4 days/week) for increased volume. After 8–12 weeks, a periodised programme (alternating high-volume and high-intensity phases) will ensure continued progress without plateauing.`,
    },

    /* ══════════════════════════════════════════════════════
       OVERWEIGHT workouts
    ══════════════════════════════════════════════════════ */

    "Low-Impact Power Walking": {
      whatItIs:
        "Low-Impact Power Walking is a purposeful, brisk form of walking performed at 5.5–7 km/h — fast enough to elevate your heart rate into the fat-burning zone (50–70% of maximum heart rate), but slow enough that one foot always remains in contact with the ground, eliminating all joint impact. Unlike running, there is zero impact force transmitted to the knees, hips, or ankles. A 40-minute power walk is clinically recommended as the most sustainable, low-injury fat-loss cardio for individuals with a BMI above the healthy range.",
      whyForYou:
        `${p}, your BMI of ${bmi} means that high-impact activities like running or jumping place significant compressive force on your joints — research shows that running generates 2.5× your body weight in force per step. Power walking provides equal cardiovascular benefit in the fat-burning heart rate zone without that impact. At a brisk 6 km/h pace and your current body weight, you'll burn approximately 260 kcal in 40 minutes — and because it's low-intensity, your body preferentially burns stored body fat (rather than glycogen) as the primary fuel source.`,
      howToPerform: [
        "Start with a 5-minute easy stroll to allow your body temperature and heart rate to rise gradually.",
        "Increase your pace to a brisk walk — you should feel your heart rate elevated and your breathing deepened, but still able to speak in short sentences.",
        "Activate your arms: bend elbows to 90°, swing them forward and back (not across your body) in rhythm with your opposite leg. This recruits your upper body and increases caloric burn by ~10%.",
        "Maintain good posture: head up (look 10 metres ahead), shoulders back and relaxed, core gently engaged, slight forward lean from the ankles (not the waist).",
        "Walk at this brisk pace for 30 continuous minutes.",
        "Final 5 minutes: gradually slow your pace back to an easy stroll to cool down.",
        "Finish with standing calf raises, quad stretches, and hip flexor lunges to prevent next-day tightness.",
      ],
      musclesTargeted:
        "Power walking engages the gluteus maximus (primary hip extensor), quadriceps, hamstrings, and calves with every stride. The activated arm swing recruits the deltoids, biceps, and triceps. The core — especially the transverse abdominis and obliques — works continuously to stabilise your trunk and transfer force between your upper and lower body. The cardiovascular system (heart and lungs) undergoes sustained moderate-intensity training, improving cardiac efficiency and stroke volume.",
      benefits: [
        `Burns ~260 kcal in 40 minutes from primarily fat stores — ideal for your BMI of ${bmi}`,
        "Zero joint impact — completely safe for knees, hips, and ankles compared to running",
        "Sustainably lowers LDL cholesterol and raises HDL cholesterol with consistent daily practice",
        "Reduces blood pressure: 30+ minutes of brisk walking 5 days/week lowers systolic BP by 4–9 mmHg",
        "Improves mood and reduces depression risk by 48% through endorphin and BDNF release",
        "Builds a sustainable daily habit that can be maintained indefinitely, unlike intense programmes",
      ],
      safetyTips: [
        "Wear supportive, cushioned walking shoes — not fashion trainers or flat-soled shoes, which provide insufficient arch support.",
        "Walk on even surfaces initially — uneven terrain increases ankle sprain risk if foot strength is still developing.",
        "If you feel pain in your shins (shin splints), reduce pace and increase rest between walks for 3–5 days.",
        "Avoid walking on very hot days during peak sun hours — heat stress compounds cardiovascular load significantly.",
        "Build duration gradually: start at 20 minutes if 40 minutes feels too challenging, then add 5 minutes per week.",
      ],
      progression:
        `${p}, begin with 40 minutes at a comfortable brisk pace 4–5 days per week. After 3 weeks, add 5 minutes per session. At week 6, introduce 2-minute jogging intervals within your walk (walk 3 min, jog 2 min, repeat). By week 10, you'll likely be jogging for the majority of the session. Long-term goal: a continuous 30-minute jog — achievable within 3 months of consistent power walking.`,
    },

    "Resistance Band Full-Body": {
      whatItIs:
        "Resistance Band Full-Body training uses elastic bands of varying resistance to create progressive tension throughout every joint's range of motion — unlike free weights which rely on gravity and only provide resistance in one direction, bands provide 'accommodating resistance', meaning the tension increases as you reach peak contraction. A 35-minute full-body band session covers all major muscle groups using functional movement patterns: pulling, pushing, hinging, and squatting. Bands are portable, joint-friendly, and highly effective for building strength and muscle without gym equipment.",
      whyForYou:
        `${p}, with a BMI of ${bmi} resistance band training is the ideal introduction to strength work because bands are inherently joint-friendly — the elastic tension reduces the compressive load on knees and hips compared to barbell or dumbbell exercises. Building lean muscle at your current BMI is critical for two reasons: first, muscle tissue burns far more calories at rest than fat tissue (raising your metabolic rate); second, strength training preserves muscle during a caloric deficit, ensuring you lose fat rather than muscle. Bands allow you to begin this process safely at home.`,
      howToPerform: [
        "Anchor your band to a door (using a door anchor) or wrap around a sturdy post. Choose a band resistance that makes 12 reps moderately challenging.",
        "Banded Squat: Step onto the band, hold handles at shoulder height, squat to parallel, drive through heels. 3 sets × 12 reps.",
        "Banded Row: Anchor at chest height, step back to create tension, pull handles to lower ribcage, squeeze shoulder blades. 3 sets × 12 reps.",
        "Banded Chest Press: Anchor at shoulder height behind you, step forward, press handles forward until elbows are nearly straight. 3 sets × 12 reps.",
        "Banded Glute Kickback: Loop around ankles, stand on one leg, kick the other leg directly backward, squeeze glute at the top. 3 × 12 each leg.",
        "Banded Lateral Walk: Loop around ankles, bend knees slightly, take 10 steps right then 10 steps left, maintain tension throughout. 3 rounds.",
        "Rest 45–60 seconds between sets. Cool down with hip flexor and chest stretches.",
      ],
      musclesTargeted:
        "Banded squats primarily target the quadriceps, glutes, and hamstrings. Rows develop the latissimus dorsi, rhomboids, and posterior deltoids. Chest press works the pectorals and triceps. Glute kickbacks isolate the gluteus maximus — the body's largest and most metabolically active muscle. Lateral walks specifically target the gluteus medius (outer hip), which stabilises the knee and pelvis — a muscle frequently weak in individuals with higher BMI, contributing to knee pain and poor movement mechanics.",
      benefits: [
        "Builds lean muscle mass, raising your resting metabolic rate — burning more calories 24/7",
        "Highly joint-friendly — accommodating resistance reduces compressive load on knees and hips",
        "Improves functional strength for daily activities — climbing stairs, carrying groceries, standing for long periods",
        "Can be performed anywhere — zero gym membership or equipment cost required",
        `Burns ~220 kcal in 35 minutes while preserving and building muscle during your weight-loss journey`,
        "Consistent band training reduces injury risk during future higher-intensity exercise",
      ],
      safetyTips: [
        "Always inspect bands for tears, nicks, or thinning before each session — a snapping band under tension can cause injury.",
        "Start with a lighter resistance band than you think you need — bands are deceptive and resistance increases sharply at full extension.",
        "Keep your core braced throughout all exercises — this protects your lower back from strain under band tension.",
        "Never let the band snap back uncontrolled — always maintain tension throughout the return phase of every movement.",
        "If a band slips or shifts during use, stop and reposition — do not attempt to adjust while under tension.",
      ],
      progression:
        `${p}, start with a light resistance band (typically colour-coded yellow or red) for all exercises. Once you can complete 3 sets of 15 reps with excellent form, step up to the next resistance level. After 4 weeks, add a 4th exercise to the circuit. After 8 weeks, combine two band exercises back-to-back (supersets) with no rest between them to increase intensity and caloric burn. At 12 weeks, consider progressing to dumbbell training for continued strength development.`,
    },

    /* ══════════════════════════════════════════════════════
       OBESE workouts
    ══════════════════════════════════════════════════════ */

    "Chair-Assisted Cardio": {
      whatItIs:
        "Chair-Assisted Cardio is a medically recognised form of low-impact exercise where a sturdy chair provides support, allowing the upper and lower body to exercise safely without placing compressive load on the joints. Exercises include seated marching, seated leg extensions, chair stands (sit-to-stand), arm raises with or without light resistance, and standing exercises using the chair back for balance support. Sessions last 20 minutes and are structured to progressively elevate the heart rate into the moderate-intensity zone.",
      whyForYou:
        `${p}, with a BMI of ${bmi} high-impact activities like running, jumping, or even unsupported standing exercise place potentially injurious mechanical stress on the knees, hips, ankles, and lower back. Chair-assisted exercise is the clinically recommended starting point — it's used in medical rehabilitation programmes globally for individuals in your BMI range. This approach prioritises safety and consistency over intensity: research shows that 20 minutes of daily moderate-intensity chair exercise produces measurable improvements in cardiovascular health, blood sugar regulation, and joint mobility within just 4 weeks.`,
      howToPerform: [
        "Choose a sturdy, armless chair (no wheels) placed on a non-slip floor. Sit near the front edge, not leaning on the backrest.",
        "Seated March (3 min): Alternately lift each knee as high as comfortable, pumping arms in opposition. Set a steady rhythm.",
        "Seated Leg Extension (2 min): Straighten one leg until nearly horizontal, hold 2 seconds, lower slowly. Alternate legs for 10 reps each.",
        "Chair Stand (10 reps): Scoot to the front of the seat. Lean slightly forward, push through heels to stand fully, lower back with control. This is the most powerful exercise for leg strength and metabolic response.",
        "Seated Arm Circles (1 min): Extend arms out to sides, make 20 forward circles then 20 backward circles.",
        "Standing Side Leg Raise (holding chair back for balance): Stand beside chair, lift one leg directly sideways 30–40°, lower with control. 10 reps each leg.",
        "Seated Trunk Rotation: Arms crossed over chest, rotate torso left and right as far as comfortable. 15 reps each direction.",
        "Finish with 3 minutes of seated deep breathing: inhale for 4 counts, exhale for 6 counts.",
      ],
      musclesTargeted:
        "Seated marching and leg extensions target the hip flexors and quadriceps without joint loading. Chair stands (sit-to-stand) are compound movements activating the quadriceps, gluteus maximus, and hamstrings — the exact muscles needed for functional daily movement. Side leg raises target the gluteus medius, which stabilises the pelvis and reduces fall risk. Arm exercises engage the deltoids and upper trapezius. The heart and lungs receive cardiovascular training throughout the session, improving oxygen delivery capacity.",
      benefits: [
        "Completely eliminates joint impact — safe for all BMI levels and existing joint conditions",
        "Improves cardiovascular fitness measurably within 4 weeks — even at low intensity",
        "The sit-to-stand exercise alone reduces risk of falls by 23% in the first 8 weeks",
        "Improves blood glucose regulation — even light exercise after meals lowers post-meal blood sugar spikes",
        "Strengthens the muscles needed for everyday activities: standing from chairs, climbing stairs, carrying items",
        "Builds exercise confidence and creates a sustainable daily habit — the foundation of long-term health improvement",
      ],
      safetyTips: [
        "Use a chair against a wall for added stability if you feel unsteady during seated exercises.",
        "Never push through joint pain — distinguish between muscle fatigue (expected) and joint pain (stop immediately).",
        "Rise slowly from seated to standing exercises — rapid position changes can cause lightheadedness.",
        "Keep sessions to 20 minutes initially — longer is not always better. Quality and consistency are the priorities.",
        "If you have cardiovascular conditions, obtain medical clearance before beginning any new exercise programme.",
      ],
      progression:
        `${p}, start with 20 minutes of chair cardio 5 days per week for 4 weeks. After 4 weeks, add 5 minutes per session and incorporate resistance: hold a water bottle during arm exercises and use a resistance band for leg extensions. At 8 weeks, begin adding 2-minute standing walks around your home between sessions. Your 12-week goal is to complete a continuous 10-minute walk outside — a milestone that opens the door to more varied and enjoyable exercise.`,
    },

    "Water Aerobics / Pool Walking": {
      whatItIs:
        "Water Aerobics and Pool Walking are forms of aquatic exercise where the buoyancy of water supports approximately 90% of your body weight, dramatically reducing the gravitational load on all joints while the water's natural resistance (drag) provides a full-body workout. Pool walking involves moving through chest-deep water at varying speeds, while water aerobics adds arm movements, leg kicks, and coordinated sequences. A 30-minute session provides cardiovascular conditioning, muscle engagement, and joint mobility work simultaneously.",
      whyForYou:
        `${p}, water exercise is medically prescribed for individuals with a BMI of ${bmi} for a specific biomechanical reason: in chest-deep water, your effective body weight is reduced by ~90%, meaning your joints experience only 10% of the compressive load they would on land. This allows your cardiovascular system and muscles to work at moderate-to-high intensity without any of the injury risk associated with land-based exercise at your current weight. Additionally, the hydrostatic pressure of water gently compresses the body's blood vessels, improving circulation and reducing oedema (swelling) in the lower limbs — a common concern at higher BMI levels.`,
      howToPerform: [
        "Enter the pool using the steps or ladder — never jump in. Move to chest-deep water (approximately armpit level).",
        "Pool Walking (5 min): Walk forward at a brisk pace across the pool, driving arms through the water in opposition to your legs. Walk back and repeat.",
        "High-Knee Walking (3 min): Exaggerate your knee lift with each step, driving your thighs to water surface level. Feel your hip flexors and core engage.",
        "Sideways Shuffling (3 min): Face the pool wall, step sideways across the pool leading with your right, then return leading with your left.",
        "Arm Pushes (3 min): Stand still, push both hands forward through the water then pull them back, feeling the drag resistance. Alternate speeds.",
        "Leg Kicks (3 min): Hold the pool wall with both hands, kick legs straight back and forth in a flutter kick motion.",
        "Jumping Jacks in Water (3 min): Perform jumping jacks — the water makes landing completely impact-free.",
        "Cool down: Float on your back for 2 minutes (noodle float if available), then gentle pool walking for 3 minutes.",
      ],
      musclesTargeted:
        "Pool walking engages the quadriceps, hamstrings, glutes, and calves against water resistance — which is 12× greater than air resistance. High-knee walking intensely activates the hip flexors and core. Arm pushes work the chest (pectorals), back (latissimus dorsi), deltoids, and triceps against the water's drag. Leg kicks isolate the hamstrings and glutes. The sustained cardiovascular effort trains the heart and lungs, while the hydrostatic pressure improves venous return and circulation throughout the lower body.",
      benefits: [
        "Provides a full-body workout with zero joint impact — ideal for knees, hips, and ankles at any weight",
        "The water's drag resistance provides 12× more resistance than air, building strength simultaneously with cardio",
        "Hydrostatic pressure reduces lower-limb swelling and improves blood circulation",
        `Burns ~180 kcal in 30 minutes — with the same cardiovascular benefit as land-based walking at twice the duration`,
        "Improves balance and coordination — water's turbulence constantly challenges your proprioceptive system",
        "The cool water environment keeps core body temperature regulated, allowing longer exercise without overheating",
      ],
      safetyTips: [
        "Never exercise in water without a lifeguard present or another person nearby — water safety is paramount.",
        "Start in water no deeper than chest height — deeper water reduces your ability to recover balance if you slip.",
        "Wear aqua shoes or pool socks — pool floors can be slippery and aqua shoes also protect from verrucas.",
        "Drink water before and after your session — you sweat in the pool even though you don't feel it.",
        "If you are not a confident swimmer, stay in the shallow end and use a pool noodle for added buoyancy.",
      ],
      progression:
        `${p}, begin with two 30-minute pool sessions per week for the first month. After 4 weeks, add a third session. At week 6, increase session length to 40 minutes and incorporate small foam dumbbells or resistance gloves to increase arm drag resistance. After 3 months of consistent pool training, your joint strength and cardiovascular fitness will typically be sufficient to begin land-based low-impact walking programmes alongside your aquatic sessions.`,
    },

    /* ══════════════════════════════════════════════════════
       COMMON workouts (all BMI categories)
    ══════════════════════════════════════════════════════ */

    "Deep Stretching & Flexibility": {
      whatItIs:
        "Deep Stretching & Flexibility training is a structured 20-minute session of static and dynamic stretching that systematically lengthens the major muscle groups and increases the range of motion across every key joint in the body. Unlike casual stretching, a structured flexibility session targets specific tissue types: the muscle belly (using sustained 30–60 second holds), myofascial tissue (using pressure-point techniques), and joint capsule mobility. This form of training is an evidence-based method for reducing injury risk, improving posture, and accelerating recovery between more intense sessions.",
      whyForYou:
        `${p}, regardless of your BMI of ${bmi}, flexibility is the most neglected yet most universally beneficial component of fitness. Research consistently shows that individuals who stretch regularly experience 55% fewer exercise-related injuries and recover from strength or cardio sessions up to 30% faster. At your current fitness level, tight hip flexors, hamstrings, and thoracic spine muscles are the most common limiters of effective movement — this session directly targets all three. Additionally, the parasympathetic nervous system activation during deep stretching lowers cortisol, the primary stress hormone, creating genuine physiological relaxation.`,
      howToPerform: [
        "Begin with 3 minutes of light movement — slow arm circles, hip circles, and gentle torso twists — to bring circulation to the muscles before stretching.",
        "Standing Quad Stretch (1 min each leg): Stand on one leg, pull the opposite foot to your glutes, keep knees together, stand tall. Hold 45 seconds.",
        "Seated Hamstring Stretch (1 min each leg): Sit on the floor, one leg extended, reach toward your toes. Hold 45 seconds — breathe into the stretch, not against it.",
        "Hip Flexor Lunge Stretch (1 min each side): Step one foot forward into a lunge, lower the back knee to the floor, shift weight forward to feel the front of your back hip stretching.",
        "Thoracic Rotation Stretch (1 min): Sit cross-legged, place one hand behind your head, rotate your elbow toward the ceiling. 10 slow rotations each side.",
        "Child's Pose (2 min): Kneel, reach arms forward, lower forehead to the floor. Breathe deeply — this stretches the lumbar spine, lats, and hip flexors simultaneously.",
        "Doorway Chest Stretch (1 min): Stand in a doorway, arms at 90°, gently press through. Held tightness in the pectoral muscles is a common cause of poor posture.",
        "Hold each stretch at the point of gentle tension — never pain. Breathe slowly and allow the muscle to release progressively with each exhale.",
      ],
      musclesTargeted:
        "This session targets all major muscle groups systematically: quadriceps (front thigh) and hip flexors (iliacus and psoas — typically the tightest muscles in sedentary individuals), hamstrings (back thigh), gluteal muscles, thoracic spine (upper and mid back extensors and rotators), latissimus dorsi (lats — the broad back muscle), pectorals (chest), and cervical spine (neck) rotators. The myofascial connective tissue surrounding these muscles is also progressively lengthened.",
      benefits: [
        "Reduces exercise-related injury risk by up to 55% when performed consistently before and after training",
        "Improves posture by lengthening chronically shortened hip flexors and chest muscles",
        "Accelerates muscle recovery by increasing blood flow and lymphatic drainage to exercised muscles",
        "Activates the parasympathetic nervous system, measurably reducing cortisol and improving sleep quality",
        "Increases joint range of motion, improving movement quality in every other form of exercise you perform",
        "Reduces chronic low back pain — the world's most common musculoskeletal complaint — within 4 weeks of daily practice",
      ],
      safetyTips: [
        "Never stretch to the point of pain — the correct sensation is a gentle pulling tension, not sharp or burning pain.",
        "Do NOT bounce in your stretches (ballistic stretching) — this triggers the muscle's stretch reflex and causes micro-tears.",
        "Breathe continuously throughout each stretch — many people unconsciously hold their breath, which increases muscle tension.",
        "Cold muscles are less pliable — perform at least 3 minutes of light movement before any deep stretching.",
        "Avoid stretching any area that is acutely injured, bruised, or swollen — stretching inflamed tissue delays healing.",
      ],
      progression:
        `${p}, begin by holding each stretch for 20–30 seconds and performing this session 3× per week. After 3 weeks, extend holds to 45 seconds. After 6 weeks, begin exploring yoga (which systematically deepens flexibility through progressive poses) or foam rolling for myofascial release. Your 3-month goal is to comfortably touch your toes with straight legs and achieve a full lunge position — both are achievable with consistent practice regardless of your starting point.`,
    },

    "Yoga Flow for Stress Relief": {
      whatItIs:
        "A Yoga Flow (Vinyasa) for Stress Relief is a carefully sequenced series of yoga poses linked by synchronised breathing, designed to calm the nervous system, release physical tension held in the body, and improve flexibility and body awareness simultaneously. Unlike power yoga, a stress-relief flow uses gentler, slower transitions and dedicates significant time to forward folds (which activate the parasympathetic 'rest and digest' system), hip openers (which store significant emotional tension), and restorative poses. The session lasts 25 minutes and is suitable for all fitness levels.",
      whyForYou:
        `${p}, chronic stress is a direct driver of elevated cortisol, which promotes abdominal fat storage, disrupts sleep, impairs immune function, and increases appetite for high-calorie foods — all of which directly counteract your wellness goals regardless of BMI. A structured yoga flow addresses the physiological root of stress, not just the symptoms. Research from Harvard Medical School shows that 25 minutes of yoga 3× per week reduces cortisol levels by an average of 27%, improves sleep quality scores by 35%, and produces measurable reductions in inflammatory markers within 8 weeks — making this one of the highest-impact wellness practices available.`,
      howToPerform: [
        "Begin in a comfortable seated position. Close your eyes, take 5 deep breaths (inhale for 4 counts through the nose, exhale for 6 counts through the mouth) to engage the parasympathetic nervous system.",
        "Cat-Cow (2 min): On hands and knees, alternate between arching your spine upward (cat) on the exhale and dropping your belly down (cow) on the inhale. Set a slow, rhythmic pace.",
        "Downward Facing Dog (hold 5 breaths): Press firmly through your palms, lift hips toward the ceiling, pedal heels alternately to stretch the calves and hamstrings.",
        "Low Lunge / Crescent Pose (5 breaths each side): Step one foot between your hands, rise up, reach arms overhead. This deeply stretches the hip flexors — the primary stress tension storage site.",
        "Warrior II (5 breaths each side): Open hips to the side, extend arms, gaze over your front hand. Builds grounding strength and confidence.",
        "Seated Forward Fold (10 breaths): Extend both legs, reach forward, hold wherever your hands reach without forcing. Let gravity do the work.",
        "Supine Spinal Twist (5 breaths each side): Lie on back, draw one knee to chest, guide it across to the opposite side. Releases the lumbar spine and thoracic rotators.",
        "Finish in Savasana (Corpse Pose) for 3–5 minutes: Lie completely still, arms slightly away from the body, palms facing up. This is not 'doing nothing' — it is the most important part of the session, allowing full nervous system integration.",
      ],
      musclesTargeted:
        "Downward Dog targets the hamstrings, calves, and shoulder girdle. Lunges and Crescent Pose deeply stretch the hip flexors (psoas and iliacus) — the muscles most associated with chronic stress tension — while strengthening the quadriceps and gluteus maximus. Warrior II engages the inner thighs (adductors), gluteus medius, and core stabilisers. Forward folds lengthen the entire posterior chain: hamstrings, glutes, and spinal erectors. The sustained breathwork trains the diaphragm, the primary breathing muscle and a key driver of the relaxation response.",
      benefits: [
        "Reduces cortisol (the stress hormone) by up to 27% with consistent 3× weekly practice",
        "Activates the parasympathetic nervous system — the physiological opposite of the stress response",
        "Improves sleep quality and reduces the time taken to fall asleep by an average of 15 minutes",
        "Increases flexibility in the hip flexors, hamstrings, and thoracic spine — areas chronically tight in desk workers",
        "Reduces blood pressure by an average of 5 mmHg systolic with 8 weeks of regular practice",
        "Builds body awareness and mindfulness, improving your relationship with hunger and emotional eating patterns",
      ],
      safetyTips: [
        `${profile.gender === "female" ? `${p}, avoid deep twists and strong abdominal compression during menstruation — opt for restorative poses instead. ` : ""}Never force a pose beyond your comfortable range — yoga injury most commonly occurs from ego-driven overstretching.`,
        "Use a folded blanket under your knees in any kneeling pose if you experience discomfort — this is not weakness, it is smart practice.",
        "In Downward Dog, if your hamstrings are very tight, bend your knees generously — a bent-knee down-dog is more beneficial than a straight-leg version with a rounded spine.",
        "Avoid comparing your pose to images online — depth of flexibility is irrelevant; the quality of your breath and attention within the pose is everything.",
        "If you have wrist pain in weight-bearing poses, make fists rather than flat palms, or use yoga blocks to reduce wrist extension angle.",
      ],
      progression:
        `${p}, start with this 25-minute stress-relief flow 3 times per week. After 4 weeks, you'll notice significant improvements in flexibility and a faster ability to access the calm state during the session. At week 6, add a 10-minute morning breathwork (pranayama) practice — this amplifies the cortisol-reducing effects. After 8 weeks, explore a beginner Vinyasa class or app-guided intermediate flow — you'll have the foundation to access deeper poses safely. Long-term, yoga practitioners report sustained cortisol reduction, improved emotional regulation, and a fundamentally changed relationship with stress.`,
    },
  };

  /* Fallback — should never be reached with correct workout names */
  return (
    map[workoutName] ?? {
      whatItIs: `${workoutName} is a structured exercise session tailored to your current fitness profile.`,
      whyForYou: `Based on your BMI of ${bmi}, this workout has been selected to safely improve your cardiovascular fitness and strength.`,
      howToPerform: [
        "Warm up with 5 minutes of light movement.",
        "Perform the main exercise for the prescribed duration.",
        "Cool down with 5 minutes of gentle stretching.",
      ],
      musclesTargeted: "Multiple major muscle groups and the cardiovascular system.",
      benefits: [
        "Improves cardiovascular health",
        "Builds strength and endurance",
        "Supports healthy body composition",
      ],
      safetyTips: [
        "Listen to your body and stop if you feel sharp pain.",
        "Stay hydrated throughout the session.",
        "Consult your doctor before starting any new exercise programme.",
      ],
      progression: `Start with the prescribed duration and gradually increase intensity over 4–6 weeks as your fitness improves.`,
    }
  );
}
