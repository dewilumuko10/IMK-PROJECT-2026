/**
 * CURRICULUM DATA - KURIKULUM MERDEKA
 * Kelas 3-4 SD Bahasa Inggris
 */

const curriculumData = {
    class3: [
        {
            id: 'unit1-3',
            number: 1,
            title: 'Greetings & Introduction',
            icon: '👋',
            area: 'Classroom',
            description: 'Belajar menyapa dan memperkenalkan diri dengan ramah',
            topics: ['Hello/Hi', 'Good morning', 'My name is...', 'How are you?'],
            vocabulary: [
                { emoji: '👋', english: 'Hello', indonesian: 'Halo', pronunciation: '/həˈloʊ/' },
                { emoji: '🌅', english: 'Good Morning', indonesian: 'Selamat Pagi', pronunciation: '/ɡʊd ˈmɔːrnɪŋ/' },
                { emoji: '🌆', english: 'Good Afternoon', indonesian: 'Selamat Siang', pronunciation: '/ɡʊd ˌæftərˈnuːn/' },
                { emoji: '🌃', english: 'Good Evening', indonesian: 'Selamat Sore', pronunciation: '/ɡʊd ˈiːvnɪŋ/' },
                { emoji: '😊', english: 'How are you?', indonesian: 'Apa kabar?', pronunciation: '/haʊ ɑːr juː/' },
                { emoji: '👍', english: "I'm fine", indonesian: 'Saya baik', pronunciation: '/aɪm faɪn/' },
                { emoji: '🙏', english: 'Thank you', indonesian: 'Terima kasih', pronunciation: '/θæŋk juː/' },
                { emoji: '👋', english: 'Goodbye', indonesian: 'Sampai jumpa', pronunciation: '/ɡʊdˈbaɪ/' }
            ],
            quiz: [
                {
                    question: 'What do you say in the morning?',
                    emoji: '🌅',
                    options: ['Good Night', 'Good Morning', 'Good Evening', 'Goodbye'],
                    correct: 'Good Morning'
                },
                {
                    question: 'How do you greet someone?',
                    emoji: '👋',
                    options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'],
                    correct: 'Hello'
                },
                {
                    question: 'What is the response to "Thank you"?',
                    emoji: '🙏',
                    options: ['Hello', 'Goodbye', "You're welcome", 'Good night'],
                    correct: "You're welcome"
                }
            ]
        },
        {
            id: 'unit2-3',
            number: 2,
            title: 'Animals Around Us',
            icon: '🐾',
            area: 'Zoo',
            description: 'Mengenal nama-nama hewan peliharaan dan ternak',
            topics: ['Pets', 'Farm animals', 'Wild animals', 'Animal sounds'],
            vocabulary: [
                { emoji: '🐱', english: 'Cat', indonesian: 'Kucing', pronunciation: '/kæt/' },
                { emoji: '🐶', english: 'Dog', indonesian: 'Anjing', pronunciation: '/dɔːɡ/' },
                { emoji: '🐰', english: 'Rabbit', indonesian: 'Kelinci', pronunciation: '/ˈræbɪt/' },
                { emoji: '🐦', english: 'Bird', indonesian: 'Burung', pronunciation: '/bɜːrd/' },
                { emoji: '🐟', english: 'Fish', indonesian: 'Ikan', pronunciation: '/fɪʃ/' },
                { emoji: '🐔', english: 'Chicken', indonesian: 'Ayam', pronunciation: '/ˈtʃɪkɪn/' },
                { emoji: '🐮', english: 'Cow', indonesian: 'Sapi', pronunciation: '/kaʊ/' },
                { emoji: '🐷', english: 'Pig', indonesian: 'Babi', pronunciation: '/pɪɡ/' },
                { emoji: '🐴', english: 'Horse', indonesian: 'Kuda', pronunciation: '/hɔːrs/' },
                { emoji: '🦆', english: 'Duck', indonesian: 'Bebek', pronunciation: '/dʌk/' }
            ],
            quiz: [
                {
                    question: 'What animal is this?',
                    emoji: '🐱',
                    options: ['Dog', 'Cat', 'Rabbit', 'Bird'],
                    correct: 'Cat'
                },
                {
                    question: 'What animal says "Moo"?',
                    emoji: '🐮',
                    options: ['Pig', 'Horse', 'Cow', 'Duck'],
                    correct: 'Cow'
                },
                {
                    question: 'What animal can fly?',
                    emoji: '🐦',
                    options: ['Fish', 'Dog', 'Bird', 'Rabbit'],
                    correct: 'Bird'
                }
            ]
        },
        {
            id: 'unit3-3',
            number: 3,
            title: 'Colors in My World',
            icon: '🎨',
            area: 'Art Room',
            description: 'Mengenal warna-warna cerah di sekitar kita',
            topics: ['Primary colors', 'Secondary colors', 'Describing objects'],
            vocabulary: [
                { emoji: '🔴', english: 'Red', indonesian: 'Merah', pronunciation: '/red/' },
                { emoji: '🔵', english: 'Blue', indonesian: 'Biru', pronunciation: '/bluː/' },
                { emoji: '🟡', english: 'Yellow', indonesian: 'Kuning', pronunciation: '/ˈjeloʊ/' },
                { emoji: '🟢', english: 'Green', indonesian: 'Hijau', pronunciation: '/ɡriːn/' },
                { emoji: '🟠', english: 'Orange', indonesian: 'Oranye', pronunciation: '/ˈɔːrɪndʒ/' },
                { emoji: '🟣', english: 'Purple', indonesian: 'Ungu', pronunciation: '/ˈpɜːrpl/' },
                { emoji: '🟤', english: 'Brown', indonesian: 'Coklat', pronunciation: '/braʊn/' },
                { emoji: '⚫', english: 'Black', indonesian: 'Hitam', pronunciation: '/blæk/' },
                { emoji: '⚪', english: 'White', indonesian: 'Putih', pronunciation: '/waɪt/' },
                { emoji: '🩷', english: 'Pink', indonesian: 'Merah Muda', pronunciation: '/pɪŋk/' }
            ],
            quiz: [
                {
                    question: 'What color is this?',
                    emoji: '🔴',
                    options: ['Blue', 'Red', 'Green', 'Yellow'],
                    correct: 'Red'
                },
                {
                    question: 'What color is the sky?',
                    emoji: '🔵',
                    options: ['Red', 'Green', 'Blue', 'Yellow'],
                    correct: 'Blue'
                },
                {
                    question: 'What color is grass?',
                    emoji: '🟢',
                    options: ['Brown', 'Blue', 'Green', 'Purple'],
                    correct: 'Green'
                }
            ]
        },
        {
            id: 'unit4-3',
            number: 4,
            title: 'My Family',
            icon: '👨‍👩‍👧‍👦',
            area: 'Home',
            description: 'Mengenal anggota keluarga tercinta',
            topics: ['Family members', 'Relationships', 'Pronouns'],
            vocabulary: [
                { emoji: '👨', english: 'Father', indonesian: 'Ayah', pronunciation: '/ˈfɑːðər/' },
                { emoji: '👩', english: 'Mother', indonesian: 'Ibu', pronunciation: '/ˈmʌðər/' },
                { emoji: '👦', english: 'Brother', indonesian: 'Kakak/Adik Laki-laki', pronunciation: '/ˈbrʌðər/' },
                { emoji: '👧', english: 'Sister', indonesian: 'Kakak/Adik Perempuan', pronunciation: '/ˈsɪstər/' },
                { emoji: '👴', english: 'Grandfather', indonesian: 'Kakek', pronunciation: '/ˈɡrændfɑːðər/' },
                { emoji: '👵', english: 'Grandmother', indonesian: 'Nenek', pronunciation: '/ˈɡrænmʌðər/' },
                { emoji: '👨‍👩‍👧', english: 'Family', indonesian: 'Keluarga', pronunciation: '/ˈfæməli/' },
                { emoji: '👶', english: 'Baby', indonesian: 'Bayi', pronunciation: '/ˈbeɪbi/' }
            ],
            quiz: [
                {
                    question: "Who is your father's father?",
                    emoji: '👴',
                    options: ['Uncle', 'Brother', 'Grandfather', 'Father'],
                    correct: 'Grandfather'
                },
                {
                    question: "What do you call your mother's daughter?",
                    emoji: '👧',
                    options: ['Brother', 'Sister', 'Mother', 'Aunt'],
                    correct: 'Sister'
                }
            ]
        },
        {
            id: 'unit5-3',
            number: 5,
            title: 'Numbers 1-20',
            icon: '🔢',
            area: 'Math Corner',
            description: 'Belajar menghitung dalam bahasa Inggris',
            topics: ['Counting', 'Number recognition', 'Simple math'],
            vocabulary: [
                { emoji: '1️⃣', english: 'One', indonesian: 'Satu', pronunciation: '/wʌn/' },
                { emoji: '2️⃣', english: 'Two', indonesian: 'Dua', pronunciation: '/tuː/' },
                { emoji: '3️⃣', english: 'Three', indonesian: 'Tiga', pronunciation: '/θriː/' },
                { emoji: '4️⃣', english: 'Four', indonesian: 'Empat', pronunciation: '/fɔːr/' },
                { emoji: '5️⃣', english: 'Five', indonesian: 'Lima', pronunciation: '/faɪv/' },
                { emoji: '6️⃣', english: 'Six', indonesian: 'Enam', pronunciation: '/sɪks/' },
                { emoji: '7️⃣', english: 'Seven', indonesian: 'Tujuh', pronunciation: '/ˈsevn/' },
                { emoji: '8️⃣', english: 'Eight', indonesian: 'Delapan', pronunciation: '/eɪt/' },
                { emoji: '9️⃣', english: 'Nine', indonesian: 'Sembilan', pronunciation: '/naɪn/' },
                { emoji: '🔟', english: 'Ten', indonesian: 'Sepuluh', pronunciation: '/ten/' }
            ],
            quiz: [
                {
                    question: 'What number is this?',
                    emoji: '5️⃣',
                    options: ['Four', 'Five', 'Six', 'Seven'],
                    correct: 'Five'
                },
                {
                    question: 'What comes after seven?',
                    emoji: '8️⃣',
                    options: ['Six', 'Seven', 'Eight', 'Nine'],
                    correct: 'Eight'
                }
            ]
        }
    ],
    class4: [
        {
            id: 'unit1-4',
            number: 1,
            title: 'Things Around Me',
            icon: '🏫',
            area: 'School',
            description: 'Mengenal benda-benda di sekolah',
            topics: ['School objects', 'Classroom items', 'This/That'],
            vocabulary: [
                { emoji: '📚', english: 'Book', indonesian: 'Buku', pronunciation: '/bʊk/' },
                { emoji: '✏️', english: 'Pencil', indonesian: 'Pensil', pronunciation: '/ˈpensl/' },
                { emoji: '✂️', english: 'Scissors', indonesian: 'Gunting', pronunciation: '/ˈsɪzərz/' },
                { emoji: '📏', english: 'Ruler', indonesian: 'Penggaris', pronunciation: '/ˈruːlər/' },
                { emoji: '🖍️', english: 'Crayon', indonesian: 'Krayon', pronunciation: '/ˈkreɪɑːn/' },
                { emoji: '📝', english: 'Paper', indonesian: 'Kertas', pronunciation: '/ˈpeɪpər/' },
                { emoji: '🎒', english: 'Bag', indonesian: 'Tas', pronunciation: '/bæɡ/' },
                { emoji: '🖊️', english: 'Pen', indonesian: 'Pulpen', pronunciation: '/pen/' }
            ],
            quiz: [
                {
                    question: 'What do you use to write?',
                    emoji: '✏️',
                    options: ['Book', 'Pencil', 'Bag', 'Paper'],
                    correct: 'Pencil'
                },
                {
                    question: 'What do you use to cut paper?',
                    emoji: '✂️',
                    options: ['Ruler', 'Scissors', 'Crayon', 'Pen'],
                    correct: 'Scissors'
                }
            ]
        },
        {
            id: 'unit2-4',
            number: 2,
            title: 'Reading Stories',
            icon: '📖',
            area: 'Library',
            description: 'Membaca cerita pendek yang menyenangkan',
            topics: ['Story comprehension', 'Moral values', 'Simple sentences'],
            story: {
                title: 'The Lion and The Mouse',
                emoji: '🦁',
                content: [
                    { en: 'Once upon a time, a lion was sleeping in the forest.', id: 'Dahulu kala, seekor singa sedang tidur di hutan.' },
                    { en: "A little mouse ran over the lion's body.", id: 'Seekor tikus kecil berlari melewati tubuh singa.' },
                    { en: 'The lion woke up and caught the mouse.', id: 'Singa terbangun dan menangkap tikus tersebut.' },
                    { en: '"Please let me go!" said the mouse.', id: '"Tolong lepaskan saya!" kata tikus.' },
                    { en: '"I will help you someday."', id: '"Saya akan membantu Anda suatu hari nanti."' },
                    { en: 'The lion laughed but let the mouse go.', id: 'Singa tertawa tapi melepaskan tikus itu.' },
                    { en: 'Later, the lion was caught in a net.', id: 'Kemudian, singa terjebak di jaring.' },
                    { en: 'The mouse came and helped by cutting the net.', id: 'Tikus datang dan membantu dengan memotong jaring.' },
                    { en: 'The lion was free!', id: 'Singa bebas!' },
                    { en: 'Moral: Little friends can be great friends!', id: 'Moral: Teman kecil bisa menjadi teman yang hebat!' }
                ]
            },
            vocabulary: [
                { emoji: '🦁', english: 'Lion', indonesian: 'Singa', pronunciation: '/ˈlaɪən/' },
                { emoji: '🐭', english: 'Mouse', indonesian: 'Tikus', pronunciation: '/maʊs/' },
                { emoji: '🌲', english: 'Forest', indonesian: 'Hutan', pronunciation: '/ˈfɔːrɪst/' },
                { emoji: '😴', english: 'Sleep', indonesian: 'Tidur', pronunciation: '/sliːp/' },
                { emoji: '🏃', english: 'Run', indonesian: 'Lari', pronunciation: '/rʌn/' },
                { emoji: '🤝', english: 'Help', indonesian: 'Membantu', pronunciation: '/help/' },
                { emoji: '🕸️', english: 'Net', indonesian: 'Jaring', pronunciation: '/net/' },
                { emoji: '✂️', english: 'Cut', indonesian: 'Memotong', pronunciation: '/kʌt/' }
            ],
            quiz: [
                {
                    question: 'Where was the lion sleeping?',
                    emoji: '🌲',
                    options: ['House', 'Forest', 'School', 'Park'],
                    correct: 'Forest'
                },
                {
                    question: 'Who helped the lion?',
                    emoji: '🐭',
                    options: ['Cat', 'Dog', 'Mouse', 'Bird'],
                    correct: 'Mouse'
                },
                {
                    question: 'What is the moral of the story?',
                    emoji: '🤝',
                    options: ['Be lazy', 'Help friends', 'Sleep all day', 'Run fast'],
                    correct: 'Help friends'
                }
            ]
        },
        {
            id: 'unit3-4',
            number: 3,
            title: 'Wild Animals',
            icon: '🦒',
            area: 'Safari Park',
            description: 'Mengenal hewan-hewan liar yang mengagumkan',
            topics: ['Zoo animals', 'Habitats', 'Animal characteristics'],
            vocabulary: [
                { emoji: '🦁', english: 'Lion', indonesian: 'Singa', pronunciation: '/ˈlaɪən/' },
                { emoji: '🐘', english: 'Elephant', indonesian: 'Gajah', pronunciation: '/ˈelɪfənt/' },
                { emoji: '🦒', english: 'Giraffe', indonesian: 'Jerapah', pronunciation: '/dʒəˈræf/' },
                { emoji: '🦓', english: 'Zebra', indonesian: 'Zebra', pronunciation: '/ˈziːbrə/' },
                { emoji: '🐯', english: 'Tiger', indonesian: 'Harimau', pronunciation: '/ˈtaɪɡər/' },
                { emoji: '🦏', english: 'Rhinoceros', indonesian: 'Badak', pronunciation: '/raɪˈnɑːsərəs/' },
                { emoji: '🦍', english: 'Gorilla', indonesian: 'Gorila', pronunciation: '/ɡəˈrɪlə/' },
                { emoji: '🐊', english: 'Crocodile', indonesian: 'Buaya', pronunciation: '/ˈkrɑːkədaɪl/' }
            ],
            quiz: [
                {
                    question: 'Which animal has a long neck?',
                    emoji: '🦒',
                    options: ['Elephant', 'Giraffe', 'Lion', 'Tiger'],
                    correct: 'Giraffe'
                },
                {
                    question: 'Which animal has stripes?',
                    emoji: '🦓',
                    options: ['Zebra', 'Lion', 'Elephant', 'Gorilla'],
                    correct: 'Zebra'
                }
            ]
        },
        {
            id: 'unit4-4',
            number: 4,
            title: 'Daily Activities',
            icon: '⏰',
            area: 'Daily Life',
            description: 'Kegiatan sehari-hari yang kita lakukan',
            topics: ['Verbs', 'Time', 'Daily routines'],
            vocabulary: [
                { emoji: '😴', english: 'Sleep', indonesian: 'Tidur', pronunciation: '/sliːp/' },
                { emoji: '🛁', english: 'Take a bath', indonesian: 'Mandi', pronunciation: '/teɪk ə bæθ/' },
                { emoji: '🍳', english: 'Eat breakfast', indonesian: 'Sarapan', pronunciation: '/iːt ˈbrekfəst/' },
                { emoji: '🎒', english: 'Go to school', indonesian: 'Pergi sekolah', pronunciation: '/ɡoʊ tuː skuːl/' },
                { emoji: '📖', english: 'Study', indonesian: 'Belajar', pronunciation: '/ˈstʌdi/' },
                { emoji: '⚽', english: 'Play', indonesian: 'Bermain', pronunciation: '/pleɪ/' },
                { emoji: '🍽️', english: 'Eat dinner', indonesian: 'Makan malam', pronunciation: '/iːt ˈdɪnər/' },
                { emoji: '🌙', english: 'Go to bed', indonesian: 'Tidur', pronunciation: '/ɡoʊ tuː bed/' }
            ],
            quiz: [
                {
                    question: 'What do you do in the morning?',
                    emoji: '🛁',
                    options: ['Sleep', 'Take a bath', 'Watch TV', 'Play'],
                    correct: 'Take a bath'
                },
                {
                    question: 'What do you do at school?',
                    emoji: '📖',
                    options: ['Sleep', 'Eat', 'Study', 'Play only'],
                    correct: 'Study'
                }
            ]
        },
        {
            id: 'unit5-4',
            number: 5,
            title: 'Food & Drinks',
            icon: '🍎',
            area: 'Cafeteria',
            description: 'Makanan dan minuman favorit',
            topics: ['Fruits', 'Vegetables', 'Drinks', 'Meals'],
            vocabulary: [
                { emoji: '🍎', english: 'Apple', indonesian: 'Apel', pronunciation: '/ˈæpl/' },
                { emoji: '🍌', english: 'Banana', indonesian: 'Pisang', pronunciation: '/bəˈnænə/' },
                { emoji: '🍊', english: 'Orange', indonesian: 'Jeruk', pronunciation: '/ˈɔːrɪndʒ/' },
                { emoji: '🍇', english: 'Grapes', indonesian: 'Anggur', pronunciation: '/ɡreɪps/' },
                { emoji: '🥕', english: 'Carrot', indonesian: 'Wortel', pronunciation: '/ˈkærət/' },
                { emoji: '🥤', english: 'Juice', indonesian: 'Jus', pronunciation: '/dʒuːs/' },
                { emoji: '🥛', english: 'Milk', indonesian: 'Susu', pronunciation: '/mɪlk/' },
                { emoji: '💧', english: 'Water', indonesian: 'Air', pronunciation: '/ˈwɔːtər/' }
            ],
            quiz: [
                {
                    question: 'Which one is a fruit?',
                    emoji: '🍎',
                    options: ['Rice', 'Apple', 'Bread', 'Water'],
                    correct: 'Apple'
                },
                {
                    question: 'What do you drink?',
                    emoji: '🥛',
                    options: ['Apple', 'Bread', 'Milk', 'Rice'],
                    correct: 'Milk'
                }
            ]
        }
    ]
};

// Teacher messages for different situations
const teacherMessages = {
    welcome: [
        'Hello! Selamat datang di kelas Bahasa Inggris! 🎉',
        'Welcome students! Mari belajar bersama! 📚',
        'Good morning class! Ayo mulai petualangan! ✨'
    ],
    encouragement: [
        'Great job! Kamu hebat! 🌟',
        'Excellent work! Luar biasa! 🎊',
        'Well done! Terus semangat! 💪'
    ],
    retry: [
        'Don\'t give up! Coba lagi ya! 😊',
        'You can do it! Ayo coba sekali lagi! 💫',
        'Keep trying! Jangan menyerah! 🌈'
    ]
};