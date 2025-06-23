<script lang="ts">
	import kinaxisLogo from "$lib/assets/img/kinaxis-logo.png";
	import wyhnLogo from "$lib/assets/img/wyhn-logo.png";
	import smLogo from "$lib/assets/img/sm-logo.png";
	import shopifyLogo from "$lib/assets/img/shopify-logo.png";
</script>

<section class="grid gap-6 lg:grid-cols-2">
	<h2 class="font-heading text-2xl text-slate-700 dark:text-slate-200">Experience</h2>
	<p class="text-slate-600 lg:col-start-1 dark:text-slate-300">
		I'm a seasoned Staff Software Developer at Shopify, skilled in TypeScript, Elm, JavaScript, and
		React. With a career spanning over two decades, I've led impactful projects, pioneered the
		adoption of TypeScript at SurveyMonkey, and developed innovative web and mobile applications.
		I'm a tech-savvy problem solver and a relentless learner.
	</p>
	<ul class="flex flex-col items-stretch gap-6 lg:col-start-2">
		<li class="flex justify-between">
			<img src={shopifyLogo} alt="Shopify logo" class="mr-2 w-11" />
			<div class="flex flex-1 flex-col">
				<span class="font-medium text-slate-600 dark:text-slate-200">Shopify</span>
				<span class="text-slate-500 dark:text-slate-300">Staff Developer</span>
			</div>
			<div class="flex items-end">
				<span class="text-slate-500 dark:text-slate-300">2022 - now</span>
			</div>
		</li>
		<li class="flex justify-between">
			<img src={smLogo} alt="SurveyMonkey logo" class="mr-2 w-11" />
			<div class="flex flex-1 flex-col">
				<span class="font-medium text-slate-600 dark:text-slate-200">SurveyMonkey</span>
				<span class="text-slate-500 dark:text-slate-300">Senior Developer</span>
			</div>
			<div class="flex items-end">
				<span class="text-slate-500 dark:text-slate-300">2019 - 2022</span>
			</div>
		</li>
		<li class="flex justify-between">
			<img src={wyhnLogo} alt="Wyhn logo" class="mr-2 w-11" />
			<div class="flex flex-1 flex-col">
				<span class="font-medium text-slate-600 dark:text-slate-200">Wyhn</span>
				<span class="text-slate-500 dark:text-slate-300">Senior Developer</span>
			</div>
			<div class="flex items-end">
				<span class="text-slate-500 dark:text-slate-300">2018 - 2018</span>
			</div>
		</li>
		<li class="flex justify-between">
			<img src={kinaxisLogo} alt="Kinaxis logo" class="mr-2 w-11" />
			<div class="flex flex-1 flex-col">
				<span class="font-medium text-slate-600 dark:text-slate-200">Kinaxis</span>
				<span class="text-slate-500 dark:text-slate-300">Advisory Developer</span>
			</div>
			<div class="flex items-end">
				<span class="text-slate-500 dark:text-slate-300">2017 - 2018</span>
			</div>
		</li>
	</ul>
</section>
