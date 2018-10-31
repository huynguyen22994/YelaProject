window.i18next
	.use(window.i18nextXHRBackend);

window.i18next.init({
	debug: true,
	lng: 'vi', // If not given, i18n will detect the browser language.
	fallbackLng: ['vi', 'en'], // Default is dev
	backend: {
		loadPath: '../admin/translate/locales/{{lng}}/{{ns}}.json'
	},
	useCookie: false,
	useLocalStorage: false
}, function (err, t) {
	console.log('resources loaded');
});

