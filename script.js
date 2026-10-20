// Job Listings Data Source
const jobsData = [
    {
        id: 'job-1',
        titleEn: 'Customer Service Representative (Female)',
        titleKm: 'បុគ្គលិកផ្នែកបម្រើសេវាកម្មអតិថិជន (នារី)',
        category: 'Customer Service',
        company: 'Huokaing Thara Recruitment',
        locationEn: 'Phnom Penh',
        locationKm: 'ភ្នំពេញ',
        typeEn: 'Full-time',
        typeKm: 'ពេញម៉ោង',
        salary: '$350 - $600',
        dateEn: 'Just now',
        dateKm: 'ទើបតែបញ្ចូល',
        descEn: 'Assist clients, respond to inquiries via phone and chat, resolve customer issues, and deliver exceptional service.',
        descKm: 'សម្របសម្រួលនិងឆ្លើយតបសំណួរអតិថិជនតាមទូរស័ព្ទ/សារ ផ្ដល់ដំណោះស្រាយ និងផ្តល់សេវាកម្មប្រកបដោយភាពស្និទ្ធស្នាល។'
    },
    {
        id: 'job-2',
        titleEn: 'Model / Actress (Female, Age 18–35)',
        titleKm: 'តារាម៉ូឌែល / តារាសម្តែង (នារី, អាយុ ១៨–៣៥ ឆ្នាំ)',
        category: 'Entertainment',
        company: 'Huokaing Thara Recruitment',
        locationEn: 'Phnom Penh',
        locationKm: 'ភ្នំពេញ',
        typeEn: 'Full-time / Contract',
        typeKm: 'ពេញម៉ោង / កិច្ចសន្យា',
        salary: '$800 - $2,500',
        dateEn: 'Just now',
        dateKm: 'ទើបតែបញ្ចូល',
        descEn: 'Seeking female models/actresses (Age: 18-35, Height: 170cm+, Weight: ~55kg) for commercial shoots, media projects, and brand representation.',
        descKm: 'ស្វែងរកតារាម៉ូឌែល/សម្តែងនារី (អាយុ ១៨–៣៥ ឆ្នាំ, កម្ពស់ ១៧០cm ឡើង, ទម្ងន់ ~៥៥kg) សម្រាប់ថតពាណិជ្ជកម្ម គម្រោងមេឌៀ និងតំណាងប្រែន។'
    },
    {
        id: 'job-3',
        titleEn: 'Khmer Language Teacher (Female, Age 18–35)',
        titleKm: 'គ្រូបង្រៀនភាសាខ្មែរ (នារី, អាយុ ១៨–៣៥ ឆ្នាំ)',
        category: 'Education',
        company: 'Huokaing Thara Recruitment',
        locationEn: 'Phnom Penh',
        locationKm: 'ភ្នំពេញ',
        typeEn: 'Full-time',
        typeKm: 'ពេញម៉ោង',
        salary: '$400 - $800',
        dateEn: 'Just now',
        dateKm: 'ទើបតែបញ្ចូល',
        descEn: 'Teach Khmer literacy and language skills to primary/secondary students or adult learners, prepare lesson plans, and assess progress.',
        descKm: 'បង្រៀនអក្សរសាស្ត្រ និងភាសាខ្មែរដល់សិស្ស ឬអ្នកសិក្សា រៀបចំកិច្ចតែងការបង្រៀន និងវាយតម្លៃលទ្ធផលសិក្សារបស់សិស្ស។'
    }
];

let currentLang = 'km'; // Default language set to Khmer

// DOM Elements
const langToggleBtn = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
const jobsContainer = document.getElementById('jobs-container');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const modal = document.getElementById('app-modal');
const closeModal = document.getElementById('close-modal');
const applyForm = document.getElementById('apply-form');

// Language Toggle Mechanics
langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'km' ? 'en' : 'km';
    langText.textContent = currentLang === 'km' ? 'English' : 'ភាសាខ្មែរ';
    
    updateStaticTranslations();
    renderJobs();
});

function updateStaticTranslations() {
    document.querySelectorAll('[data-km]').forEach(elem => {
        const text = elem.getAttribute(`data-${currentLang}`);
        if (text) elem.textContent = text;
    });

    document.querySelectorAll('[data-km-placeholder]').forEach(elem => {
        const placeholder = elem.getAttribute(`data-${currentLang}-placeholder`);
        if (placeholder) elem.placeholder = placeholder;
    });
}

// Render Job Cards Dynamically
function renderJobs() {
    const query = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = jobsData.filter(job => {
        const title = (currentLang === 'km' ? job.titleKm : job.titleEn).toLowerCase();
        const matchesQuery = title.includes(query);
        const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
        return matchesQuery && matchesCategory;
    });

    jobsContainer.innerHTML = '';

    if (filtered.length === 0) {
        jobsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8;">${currentLang === 'km' ? 'មិនមានការងារត្រូវតាមការស្វែងរករបស់អ្នកឡើយ' : 'No jobs found matching your search.'}</p>`;
        return;
    }

    filtered.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';

        const title = currentLang === 'km' ? job.titleKm : job.titleEn;
        const location = currentLang === 'km' ? job.locationKm : job.locationEn;
        const type = currentLang === 'km' ? job.typeKm : job.typeEn;
        const desc = currentLang === 'km' ? job.descKm : job.descEn;
        const date = currentLang === 'km' ? job.dateKm : job.dateEn;
        const applyBtnText = currentLang === 'km' ? 'ដាក់ពាក្យធ្វើការ' : 'Apply Now';

        card.innerHTML = `
            <div>
                <div class="job-header">
                    <h3 class="job-title">${title}</h3>
                    <span class="salary-tag">${job.salary}</span>
                </div>
                <div class="job-company">${job.company} • 📍 ${location}</div>
                <p class="job-desc">${desc}</p>
                <div class="job-meta">
                    <span class="badge-tag">🕒 ${type}</span>
                    <span class="badge-tag">📅 ${date}</span>
                </div>
            </div>
            <button class="btn btn-primary btn-block" onclick="openApplyModal('${job.id}')">${applyBtnText}</button>
        `;

        jobsContainer.appendChild(card);
    });
}

// Search & Filter Listeners
searchInput.addEventListener('input', renderJobs);
categoryFilter.addEventListener('change', renderJobs);

// Modal Functions
window.openApplyModal = function(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;

    document.getElementById('modal-job-title').textContent = currentLang === 'km' ? job.titleKm : job.titleEn;
    document.getElementById('modal-job-company').textContent = `${job.company} (${job.salary})`;
    modal.style.display = 'flex';
};

closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

applyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(currentLang === 'km' ? 'ពាក្យសុំរបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ!' : 'Your application has been submitted successfully!');
    modal.style.display = 'none';
    applyForm.reset();
});

// Initial Setup
renderJobs();
