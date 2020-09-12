const calculateBmi = (height: number, mass: number): string => {
    const bmi = mass / height ** 2
    if (bmi < 16)
        return "Severely underweight"
    else if (bmi < 18.5)
        return "Underweight"
    else if (bmi < 25)
        return "Normal weight"
    else if (bmi < 30)
        return "Overweight"
    else
        return "Obese"
}

export default calculateBmi