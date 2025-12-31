document.getElementById('search-recommendation').addEventListener('click', showrecommendation);
document.getElementById('reset-recommendation').addEventListener('click', resetrecommendation); 
function showrecommendation(event){
    event.preventDefault();
    const recommendationInput = document.getElementById('recommendation').value.toLowerCase();
    const recommendationInfo = document.querySelector('.recommendation-results');
    console.log(recommendationInput);
    let recommendation = '';
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            recommendation = data[recommendationInput];
            console.log(recommendation);
            let output = '';
            if (recommendation && Array.isArray(recommendation)) {
                recommendation.forEach(item => {
                    console.log(item.name);
                    console.log(item.description);
                    console.log(item.imageUrl);          
                    output += `
                    <div class="recommendation-item">
                        <img src="${item.imageUrl}" alt="${item.name}" class="recommendation-image"/>
                        <h2>${item.name}</h2>
                        <p>${item.description}</p>
                    </div>
                    `;
                });
            } else {
                output = '<p>No recommendations found.</p>';
            }
            recommendationInfo.innerHTML = output;
        })
        .catch(error => console.error('Error fetching recommendations:', error));
}
function resetrecommendation(event){
    event.preventDefault();
    document.getElementById('recommendation').value = '';
    document.querySelector('.recommendation-results').innerHTML = '';
}