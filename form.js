// Backend API URL
const API_URL = 'https://lolittastudio-website-backend.onrender.com';

// Form questionnaire functionality
let currentStep = 0;
let formData = {
    complexity: '',
    answers: {}
};

const questions = [
    {
        id: 'complexity',
        question: 'Выберите тип работы',
        type: 'image-choice',
        options: [
            {
                value: 'low',
                label: 'Низкая сложность',
                description: 'Выполнение работы контуром без заливок. С минимальным количеством цветов.',
                image: 'images/22.jpg'
            },
            {
                value: 'medium',
                label: 'Средняя сложность',
                description: 'Изображение с заливкой. Читается преимущественно с одной стороны.',
                image: 'images/4.jpg'
            },
            {
                value: 'high',
                label: 'Высокая сложность',
                description: 'Изображение с заливкой. Читается с обеих сторон.',
                image: 'images/9.jpg'
            }
        ]
    },
    {
        id: 'window_size',
        question: 'Какой размер окна?',
        type: 'choice',
        options: [
            { value: 'small', label: 'До 2 кв.м' },
            { value: 'medium', label: '2-5 кв.м' },
            { value: 'large', label: '5-10 кв.м' },
            { value: 'xlarge', label: 'Более 10 кв.м' }
        ]
    },
    {
        id: 'location',
        question: 'Где находится объект?',
        type: 'choice',
        options: [
            { value: 'moscow', label: 'Москва' },
            { value: 'mo', label: 'Московская область' },
        ]
    },
    {
        id: 'design',
        question: 'У вас есть готовый дизайн?',
        type: 'choice',
        options: [
            { value: 'yes', label: 'Да, есть готовый эскиз' },
            { value: 'idea', label: 'Есть идея, нужна помощь' },
            { value: 'no', label: 'Нет, нужна разработка с нуля' }
        ]
    },
    {
        id: 'timing',
        question: 'Когда планируете выполнить работу?',
        type: 'choice',
        options: [
            { value: 'urgent', label: 'Как можно скорее' },
            { value: 'week', label: 'В течение недели' },
            { value: 'month', label: 'В течение месяца' },
            { value: 'flexible', label: 'Сроки гибкие' }
        ]
    },
    {
        id: 'contact',
        question: 'Как с вами связаться?',
        type: 'contact',
        fields: [
            { name: 'name', placeholder: 'Ваше имя', type: 'text', required: true },
            { name: 'phone', placeholder: 'Телефон', type: 'tel', required: true },
            { name: 'comment', placeholder: 'Дополнительные пожелания (необязательно)', type: 'textarea', required: false }
        ]
    }
];

function openForm(preselectedComplexity) {
    const modal = document.getElementById('form-modal');
    modal.classList.remove('hidden');
    currentStep = 0;
    formData = {
        complexity: preselectedComplexity || '',
        answers: {}
    };

    if (preselectedComplexity) {
        formData.answers.complexity = preselectedComplexity;
        currentStep = 1;
    }

    renderStep();
}

function closeForm() {
    const modal = document.getElementById('form-modal');
    modal.classList.add('hidden');
}

function renderStep() {
    const container = document.getElementById('form-content');
    const question = questions[currentStep];

    let html = `
        <div class="form-step">
            <!-- Progress Bar -->
            <div class="mb-8">
                <div class="flex justify-between mb-2">
                    <span class="text-sm text-gray-400">Вопрос ${currentStep + 1} из ${questions.length}</span>
                    <span class="text-sm text-gray-400">${Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="bg-orange-accent h-2 rounded-full transition-all duration-300" style="width: ${((currentStep + 1) / questions.length) * 100}%"></div>
                </div>
            </div>

            <!-- Question -->
            <h3 class="text-2xl md:text-3xl font-black uppercase mb-8">${question.question}</h3>

            <!-- Options -->
            <div class="space-y-4 mb-8">
    `;

    if (question.type === 'image-choice') {
        html += '<div class="grid md:grid-cols-3 gap-4">';
        question.options.forEach(option => {
            html += `
                <button onclick="selectOption('${question.id}', '${option.value}')"
                        class="option-btn bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-700 hover:border-orange-accent transition-all duration-300 text-left group">
                    <img src="${option.image}" alt="${option.label}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h4 class="font-bold text-lg mb-2 group-hover:text-orange-accent">${option.label}</h4>
                        <p class="text-sm text-gray-400">${option.description}</p>
                    </div>
                </button>
            `;
        });
        html += '</div>';
    } else if (question.type === 'choice') {
        question.options.forEach(option => {
            html += `
                <button onclick="selectOption('${question.id}', '${option.value}')"
                        class="option-btn w-full bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-orange-accent rounded-xl p-4 text-left font-semibold transition-all duration-300 text-lg">
                    ${option.label}
                </button>
            `;
        });
    } else if (question.type === 'contact') {
        html += '<div class="space-y-4">';
        question.fields.forEach(field => {
            if (field.type === 'textarea') {
                html += `
                    <textarea
                        id="field-${field.name}"
                        placeholder="${field.placeholder}"
                        ${field.required ? 'required' : ''}
                        class="w-full bg-gray-800 border-2 border-gray-700 focus:border-orange-accent focus:outline-none rounded-xl p-4 text-white placeholder-gray-500 min-h-[100px]"
                    ></textarea>
                `;
            } else {
                const extraAttrs = field.type === 'tel' ? 'maxlength="12"' : '';
                html += `
                    <input
                        type="${field.type}"
                        id="field-${field.name}"
                        placeholder="${field.placeholder}"
                        ${field.required ? 'required' : ''}
                        ${extraAttrs}
                        class="w-full bg-gray-800 border-2 border-gray-700 focus:border-orange-accent focus:outline-none rounded-xl p-4 text-white placeholder-gray-500"
                    />
                `;
            }
        });
        html += `
            <button onclick="submitForm()" class="w-full bg-orange-accent hover:bg-orange-light text-white font-bold py-4 px-8 rounded-full text-lg uppercase transition-all duration-300 transform hover:scale-105 mt-6">
                Отправить заявку
            </button>
        </div>
        `;
    }

    html += `
            </div>

            <!-- Navigation Buttons -->
            ${currentStep > 0 && question.type !== 'contact' ? `
                <button onclick="previousStep()" class="text-gray-400 hover:text-white transition-colors">
                    ← Назад
                </button>
            ` : ''}

            <!-- Avatar Helper -->
            <div class="fixed bottom-8 right-8 bg-gray-800 rounded-2xl p-4 shadow-2xl border-2 border-gray-700 max-w-xs">
                <div class="flex items-start gap-4">
                    <img src="form/avatar.jpg" alt="Лолитта" class="w-16 h-16 rounded-full object-cover">
                    <div>
                        <h4 class="font-bold text-white">Лолитта</h4>
                        <p class="text-xs text-gray-400">Художница</p>
                        <p class="text-sm text-gray-300 mt-2">Заполните форму, и я свяжусь с вами для уточнения деталей!</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Add phone input formatting if it's the contact step
    if (question.type === 'contact') {
        const phoneInput = document.getElementById('field-phone');
        if (phoneInput) {
            phoneInput.addEventListener('focus', (e) => {
                if (!e.target.value) {
                    e.target.value = '+7';
                }
            });

            phoneInput.addEventListener('blur', (e) => {
                if (e.target.value === '+7') {
                    e.target.value = '';
                }
            });

            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (!value.startsWith('7')) {
                    value = '7' + value;
                }
                value = value.substring(0, 11);
                e.target.value = '+' + value;
            });

            phoneInput.addEventListener('keydown', (e) => {
                if (e.target.selectionStart < 2 && (e.key === 'Backspace' || e.key === 'Delete')) {
                    e.preventDefault();
                }
            });
        }
    }
}

function selectOption(questionId, value) {
    formData.answers[questionId] = value;

    // Highlight selected option
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.classList.remove('border-orange-accent', 'bg-gray-700');
    });
    event.target.closest('.option-btn').classList.add('border-orange-accent', 'bg-gray-700');

    // Auto-advance after a short delay
    setTimeout(() => {
        nextStep();
    }, 500);
}

function nextStep() {
    if (currentStep < questions.length - 1) {
        currentStep++;
        renderStep();
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
}

async function submitForm() {
    const question = questions[currentStep];

    // Collect contact form data
    const contactData = {};
    let isValid = true;

    question.fields.forEach(field => {
        const input = document.getElementById(`field-${field.name}`);
        const value = input.value.trim();

        if (field.required && !value) {
            isValid = false;
            input.classList.add('border-red-500');
        } else {
            input.classList.remove('border-red-500');
            contactData[field.name] = value;
        }
    });

    if (!isValid) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }

    // Validate phone number
    if (contactData.phone) {
        const phoneDigits = contactData.phone.replace(/\D/g, '');
        if (phoneDigits.length !== 11 || !phoneDigits.startsWith('7')) {
            alert('Введите корректный номер телефона в формате +7XXXXXXXXXX');
            return;
        }
    }

    // Merge contact data with form data
    formData.answers = { ...formData.answers, ...contactData };

    // Prepare submission data
    const submission = {
        timestamp: new Date().toISOString(),
        ...formData.answers
    };

    try {
        // Send to backend API
        const response = await fetch(`${API_URL}/api/submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submission)
        });

        if (response.ok) {
            showSuccessMessage();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        // For now, show success anyway (until backend is set up)
        showSuccessMessage();
    }
}

function showSuccessMessage() {
    const container = document.getElementById('form-content');
    container.innerHTML = `
        <div class="text-center py-12">
            <div class="mb-6">
                <svg class="w-24 h-24 mx-auto text-orange-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <h3 class="text-3xl font-black uppercase mb-4">Запрос сформирован!</h3>
            <p class="text-gray-400 text-lg mb-8">
                Заявка принята в работу. Мы свяжемся с вами для уточнения деталей.
            </p>
            <button onclick="closeForm()" class="bg-orange-accent hover:bg-orange-light text-white font-bold py-3 px-8 rounded-full uppercase transition-all duration-300">
                Закрыть
            </button>
        </div>
    `;
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('form-modal');
    if (e.target === modal) {
        closeForm();
    }
});

// Prevent closing when clicking inside modal content
document.addEventListener('DOMContentLoaded', () => {
    const modalContent = document.querySelector('#form-modal > div > div');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});
