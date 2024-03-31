// fungsi asinkronus untuk mengambil data dari backend API
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response1 = await fetch('https://backend-prediction-rel-tik7mr2eha-et.a.run.app/predict');
        const data1 = await response1.json();
        console.log(data1);

        const response2 = await fetch('https://sibi-backends-tik7mr2eha-et.a.run.app');
        const data2 = await response2.json();
        console.log(data2);
    } catch (error) {
        console.error('Error:', error);
    }
});