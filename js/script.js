const yearEl = document.querySelector(".year");
yearEl.textContent = new Date().getFullYear();

const header = document.querySelector(".header");
const btnNavEl = document.querySelector(".btn-mobile-nav");

btnNavEl.addEventListener("click", function () {
	header.classList.toggle("nav-open");
});

const allLinks = document.querySelectorAll("a:link");
// console.log(allLinks);

allLinks.forEach(function (link) {
	link.addEventListener("click", function (e) {
		e.preventDefault();

		const href = link.getAttribute("href");
		// console.log(href);

		if (href === "#")
			window.scrollTo({
				behavior: "smooth",
				top: 0,
			});

		if (href !== "#" && href.startsWith("#")) {
			const sectionEl = document.querySelector(href);
			sectionEl.scrollIntoView({ behavior: "smooth" });
		}

		if (link.classList.contains("main-nav-link")) {
			header.classList.toggle("nav-open");
		}
	});
});

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
	function (entries) {
		const ent = entries[0];

		// console.log(ent);

		if (ent.isIntersecting === false) {
			document.body.classList.add("sticky");
		}

		if (ent.isIntersecting === true) {
			document.body.classList.remove("sticky");
		}
	},
	{
		root: null,
		threshold: 0,
		rootMargin: "-70px",
	}
);

obs.observe(sectionHeroEl);

// Fixing flexbox gap property missing in some Safari versions

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

function checkFlexGap() {
	var flex = document.createElement("div");
	flex.style.display = "flex";
	flex.style.flexDirection = "column";
	flex.style.rowGap = "1px";

	flex.appendChild(document.createElement("div"));
	flex.appendChild(document.createElement("div"));

	document.body.appendChild(flex);
	var isSupported = flex.scrollHeight === 1;
	flex.parentNode.removeChild(flex);
	// console.log(isSupported);

	if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
