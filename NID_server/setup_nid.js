require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'investment_hub',
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10
});

const db = pool.promise();

async function setup() {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS nid_table (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nid_number VARCHAR(20) NOT NULL UNIQUE,
                name VARCHAR(100) NOT NULL,
                father_name VARCHAR(100),
                mother_name VARCHAR(100),
                date_of_birth DATE NOT NULL,
                age INT NOT NULL,
                gender ENUM('male','female','other') NOT NULL,
                address TEXT NOT NULL,
                district VARCHAR(100) NOT NULL,
                division VARCHAR(100) NOT NULL,
                phone VARCHAR(15),
                blood_group VARCHAR(5),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('nid_table created');

        const [existing] = await db.execute('SELECT COUNT(*) as count FROM nid_table');
        if (existing[0].count > 0) {
            console.log('Data already exists, skipping insert');
            process.exit(0);
        }

        const fakeData = [
            ['1010101010101', 'Md. Rahim Uddin', 'Abdul Karim', 'Fatema Begum', '1990-05-15', 36, 'male', '42, Green Road, Banani', 'Dhaka', 'Dhaka', '01712345678', 'O+'],
            ['1010101010102', 'Fatima Khatun', 'Abdur Rashid', 'Rahimun Nessa', '1995-08-22', 30, 'female', '15, Mirpur-10, Pallabi', 'Dhaka', 'Dhaka', '01812345679', 'A+'],
            ['1010101010103', 'Kamal Hossain', 'Abul Hashem', 'Halima Khatun', '1988-03-10', 38, 'male', '7, Agrabad C/A, Chawk Bazar', 'Chattogram', 'Chattogram', '01912345680', 'B+'],
            ['1010101010104', 'Nusrat Jahan', 'Mohammad Ali', 'Roksana Begum', '1992-11-28', 33, 'female', '23, Station Road, Rajshahi Sadar', 'Rajshahi', 'Rajshahi', '01612345681', 'AB+'],
            ['1010101010105', 'Arif Rahman', 'Shamsul Haque', 'Amena Begum', '1985-07-03', 40, 'male', '5, Zindabazar, Sylhet', 'Sylhet', 'Sylhet', '01512345682', 'O-'],
            ['1010101010106', 'Sumaiya Akter', 'Nazrul Islam', 'Jesmin Ara', '1998-01-19', 28, 'female', '18, Kazir Bazar, Comilla', 'Comilla', 'Chattogram', '01312345683', 'A-'],
            ['1010101010107', 'Tanvir Ahmed', 'Rafiqul Islam', 'Salma Khatun', '1991-09-05', 34, 'male', '31, Dhanmondi R/A, Block-C', 'Dhaka', 'Dhaka', '01712345684', 'B-'],
            ['1010101010108', 'Mst. Ruma Begum', 'Shahjalal Miah', 'Rahima Khatun', '1993-04-17', 33, 'female', '9, Court Road, Barisal Sadar', 'Barishal', 'Barishal', '01812345685', 'O+'],
            ['1010101010109', 'Sakib Al Hasan', 'Mahbubul Alam', 'Nargis Akter', '1996-12-01', 29, 'male', '12, University Road, Rangpur', 'Rangpur', 'Rangpur', '01912345686', 'A+'],
            ['1010101010110', 'Taslima Akhter', 'Fazlul Haque', 'Momtaz Begum', '1989-06-25', 37, 'female', '27, Lalmatia, Mohammadpur', 'Dhaka', 'Dhaka', '01612345687', 'B+'],
            ['1010101010111', 'Jahangir Alam', 'Abdus Sattar', 'Hafiza Khatun', '1987-02-14', 39, 'male', '3, Kadamtali, Narayanganj', 'Narayanganj', 'Dhaka', '01512345688', 'AB-'],
            ['10101010101112', 'Shirin Akter', 'Kamal Uddin', 'Rashida Begum', '1994-10-08', 31, 'female', '16, Dewan Bazar, Mymensingh', 'Mymensingh', 'Mymensingh', '01312345689', 'O+'],
            ['1010101010113', 'Anisur Rahman', 'Mostafa Kamal', 'Jamila Khatun', '1986-08-30', 39, 'male', '8, Kazla, Bogra Sadar', 'Bogura', 'Rajshahi', '01712345690', 'A+'],
            ['1010101010114', 'Roksana Parveen', 'Abdul Mannan', 'Nasima Akter', '1997-03-22', 29, 'female', '21, College Road, Gazipur Sadar', 'Gazipur', 'Dhaka', '01812345691', 'B-'],
            ['1010101010115', 'Habib Rahman', 'Liakat Ali', 'Rahat Ara', '1990-01-11', 36, 'male', '14, Khanpur, Jessore Sadar', 'Jashore', 'Khulna', '01912345692', 'O+'],
            ['1010101010116', 'Maliha Khatun', 'Shahidul Islam', 'Halimun Nessa', '1993-07-19', 32, 'female', '33, Shibganj, Chapainawabganj', 'Chapainawabganj', 'Rajshahi', '01612345693', 'A-'],
            ['1010101010117', 'Rakibul Hassan', 'Aminul Haque', 'Suraya Khatun', '1991-05-06', 35, 'male', '6, Bypass Road, Cox\'s Bazar', 'Cox\'s Bazar', 'Chattogram', '01512345694', 'AB+'],
            ['1010101010118', 'Naima Siddiqua', 'Wahiduzzaman', 'Farida Begum', '1999-09-14', 26, 'female', '11, Banasree, Rampura', 'Dhaka', 'Dhaka', '01312345695', 'B+'],
            ['1010101010119', 'Sohel Rana', 'Abdul Barek', 'Jahanara Begum', '1984-12-28', 41, 'male', '29, Tongi, Gazipur', 'Gazipur', 'Dhaka', '01712345696', 'O+'],
            ['1010101010120', 'Tania Rahman', 'Mohsin Talukder', 'Ayesha Khatun', '1995-02-07', 31, 'female', '2, Court Complex Road, Dinajpur', 'Dinajpur', 'Rangpur', '01812345697', 'A+'],
            ['1010101010121', 'Farhan Faiyaz', 'Golam Kibria', 'Saleha Begum', '1992-06-16', 34, 'male', '19, Kakrail, Ramna', 'Dhaka', 'Dhaka', '01912345698', 'B+'],
            ['1010101010122', 'Sabrina Yesmin', 'Abdul Alim', 'Razia Khatun', '1988-11-03', 37, 'female', '25, Kazirhat, Barguna', 'Barguna', 'Barishal', '01612345699', 'O-'],
            ['1010101010123', 'Imran Hossain', 'Abdur Rouf', 'Momenuzzaman', '1993-08-21', 32, 'male', '13, Ambarkhana, Feni Sadar', 'Feni', 'Chattogram', '01512345700', 'A+'],
            ['1010101010124', 'Tahsin Rahman', 'Mizanur Rahman', 'Khaleda Khatun', '1996-04-09', 30, 'female', '30, Shyamoli, Mohammadpur', 'Dhaka', 'Dhaka', '01312345701', 'AB+'],
            ['1010101010125', 'Zahidul Islam', 'Abdul Khaleq', 'Hasina Begum', '1983-01-25', 43, 'male', '4, Kakrail Road, Motijheel', 'Dhaka', 'Dhaka', '01712345702', 'O+'],
        ];

        for (const row of fakeData) {
            await db.execute(
                `INSERT INTO nid_table (nid_number, name, father_name, mother_name, date_of_birth, age, gender, address, district, division, phone, blood_group)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                row
            );
        }
        console.log(`${fakeData.length} fake NID records inserted`);
    } catch (e) {
        console.log('Error:', e.message);
    }
    process.exit(0);
}

setup();
