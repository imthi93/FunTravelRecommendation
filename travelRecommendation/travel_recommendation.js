document.getElementById('search-recommendation').addEventListener('click', showrecommendation);
document.getElementById('reset-recommendation').addEventListener('click', resetrecommendation); 
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for contacting us! We will get back to you shortly.');
    document.getElementById('contact-form').reset();
});
function showrecommendation(event){
    event.preventDefault();
    const recommendationInput = document.getElementById('recommendation').value.toLowerCase();
    document.querySelector('.recommendation-results').innerHTML = '';
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
                // Flatten nested arrays (e.g., cities inside countries)
                let flatData = [];
                recommendation.forEach(item => {
                    if (item.cities && Array.isArray(item.cities)) {
                        // If item has nested cities, add all cities to flatData
                        flatData.push(...item.cities);
                    } else {
                        // Otherwise, add the item directly (for flat structures like beaches, temples)
                        flatData.push(item);
                    }
                });
                
                // Now render all items
                flatData.forEach(item => {
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