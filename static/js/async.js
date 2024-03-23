document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response1 = await fetch('https://backend-prediction-rel-tik7mr2eha-et.a.run.app');
        const data1 = await response1.json();
        // Process the data from the first API response
        console.log(data1);

        const response2 = await fetch('https://sibi-backends-tik7mr2eha-et.a.run.app');
        const data2 = await response2.json();
        // Process the data from the second API response
        console.log(data2);
    } catch (error) {
        console.error('Error:', error);
    }
});