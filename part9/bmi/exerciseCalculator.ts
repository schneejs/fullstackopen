type Rating = 1 | 2 | 3
type RatingDescription = "Bad" | "Satisfactory" | "Good"

interface ExerciseRating {
    totalDays: number,
    trainingDays: number,
    average: number,
    target: number,
    success: boolean,
    rating: Rating,
    ratingDescription: RatingDescription
}

const calculateExercises = (exerciseHours: number[]): ExerciseRating => {
    const calculateRating = (average: number): Rating => {
        if (average < 0.25)
            return 1
        else if (average < 0.75)
            return 2
        else
            return 3
    }

    const getRatingDescription = (rating: Rating): RatingDescription => {
        switch (rating) {
            case 1:
                return "Bad"
            case 2:
                return "Satisfactory"
            case 3:
                return "Good"
        }
    }

    const totalDays = exerciseHours.length
    const trainingDays = exerciseHours.filter(exerciseDuration => exerciseDuration > 0).length
    const average = exerciseHours.reduce((acc, val) => acc + val) / totalDays
    const target = 0.25
    const success = average >= target
    const rating = calculateRating(average)
    const ratingDescription = getRatingDescription(rating)
    
    return {
        totalDays, trainingDays, average, target,
        success, rating, ratingDescription
    }
}

if (process.argv.length < 3) {
    const predef = [0.23, 0.24, 0.25, 0.26, 0.28, 0.3, 0.24]
    console.log(`Using predefined data: ${predef}`)
    console.log(calculateExercises(predef))
} else {
    const data = process.argv.slice(2).map(arg => Number(arg))
    console.log(calculateExercises(data))
}