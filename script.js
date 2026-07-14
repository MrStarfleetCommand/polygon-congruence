const form = document.querySelector('form');
form.addEventListener('submit', event => {
	event.preventDefault();
	const formData = new FormData(form);
	const n = formData.get('sides');
	const projections = [];

	for (let i = 0; i < (2 * (n ** n)) / (n ** 2); i++){
		const x = [];
		const sequences = {};
		let invalid;

		for (let d = 0; d < n; d++){
			const v = Math.floor(i / (n ** (n - 1 - d))) % n;

			if (Math.max(...x) > v && !x.includes(v)){
				invalid = true;
				break;
			}

			if (x.at(-1) === v){
				sequences[v][sequences[v].length - 1]++;
			} else {
				sequences[v] = sequences[v] || [];
				sequences[v].push(1);
			}

			x.push(v);
		}

		if (invalid || (Math.max(...x) && !x.at(-1))){
			continue;
		}

		for (let v = Math.min(...x); v <= Math.max(...x); v++){
			if (!x.includes(v) || Math.max(...sequences[v]) > sequences[0][0]){
				invalid = true;
				break;
			}
		}

		if (invalid){
			continue;
		}

		for (const m in x){
			if (!m){
				continue;
			}
			const r = [...x];
			const mapper = {};
			let max = 0;
			for (let d = 0; d < m; d++){
				r.push(r[0]);
				r.shift();
			}
			for (const y in r){
				if (!Object.hasOwn(mapper, r[y])){
					mapper[r[y]] = max;
					max++;
				}
				r[y] = mapper[r[y]];
			}
			if (projections.some(p => p.join() === r.join())){
				invalid = true;
				break;
			}
		}

		if (invalid){
			continue;
		}

		projections.push(x);
	}

	alert(projections.length);
});
