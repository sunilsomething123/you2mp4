document.getElementById('downloadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const url = document.getElementById('url').value;
    document.getElementById('loading').classList.remove('hidden');

    try {
        const response = await fetch(`https://youtomp4.onrender.com/download?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        document.getElementById('loading').classList.add('hidden');

        if (response.ok) {
            const formatsList = document.getElementById('formatsList');
            formatsList.innerHTML = '';
            data.formats.forEach(format => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = format.url;
                link.textContent = `${format.quality} (${format.type})`;
                listItem.appendChild(link);
                formatsList.appendChild(listItem);
            });
            document.getElementById('formatsContainer').classList.remove('hidden');
        } else {
            document.getElementById('errorMessage').textContent = data.error;
            document.getElementById('errorMessage').classList.remove('hidden');
        }
    } catch (error) {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('errorMessage').textContent = 'An error occurred. Please try again.';
        document.getElementById('errorMessage').classList.remove('hidden');
    }
});
