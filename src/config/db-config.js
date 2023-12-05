const config = {
	HOST: process.env.DB_HOST,
	DB: process.env.DB_NAME,
	PORT: process.env.DB_PORT,
	USER: process.env.DB_USER,
	PASSWORD: process.env.DB_PASSWORD,
	dialect: 'postgresql'
};

export default config;
