const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key":
            "af32dee011msh333f2f3a13f56cep10f9a2jsn8f199cf8ed72",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
};



export async function getweatherFrom(query = "mexico"){
    const response = await fetch(
        "https://weatherapi-com.p.rapidapi.com/current.json?q="+query,
        options
    )
        const data= await response.json()
            const { location, current } = data;
            const { country, localtime, name } = location;
            const {
                condition,
                humidity,
                feelslike_c,
                is_day,
                temp_c,
                wind_kph,
                wind_dir,
            } = current;
            const { icon, text } = condition;
            return {
                conditionIcon: icon,
                conditionText: text,
                country,
                localtime,
                name,
                humidity,
                isDay: is_day,
                feelsLike: feelslike_c,
                temperature: temp_c,
                windSpeed: wind_kph,
                windDir: wind_dir,
            };
        
}