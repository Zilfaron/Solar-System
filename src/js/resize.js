let addAutoResize = (cnvs, callback) => {
	[cnvs.width, cnvs.height] = [window.innerWidth, window.innerHeight];

	if (typeof callback === "function") {
		callback.call(cnvs);
	};

	window.addEventListener("resize", () => {
		[cnvs.width, cnvs.height] = [window.innerWidth, window.innerHeight];

		if (typeof callback === "function") {
			callback.call(cnvs);
		};
	});
	
	return cnvs;
}

export default addAutoResize;