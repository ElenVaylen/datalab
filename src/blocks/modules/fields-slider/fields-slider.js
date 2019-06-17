(function() {
	/**
   * items of slider
   */
	let sliderPoints;

	/**
   * Coordinates of slider points
   * For all but last one value = left
   * For the last one value = right
   */

	let sliderPointsCoordinates;

	/**
   * Initial Position of mouse grip
   */

	let initialGripPosition;

	/**
   *  Previous position of Handle
   */

  let previousGripPosition;
  
  /**
   * Valirable for input
   */

  let realSlider;
  
  /**
   * Pointer of slider
   */

	let sliderHandle;

	function getPointsCoordinates () {
		let sliderCoordinates = [];
		sliderPoints.forEach((item, index) => {
			if (index !== sliderPoints.length - 1) {
				sliderCoordinates.push(Math.round(item.getBoundingClientRect().left));
			} else {
				sliderCoordinates.push(Math.floor(item.getBoundingClientRect().right));
			}
		});
		sliderPointsCoordinates = [...sliderCoordinates];
	}
  
	function getPreviousGripPosition () {
		let handleWidth = Math.floor(sliderHandle.offsetWidth / 2)
		previousGripPosition = sliderPoints
			.slice(0, Number(realSlider.value) !== Number(realSlider.max)
				? Number(realSlider.value - 1)
				: Number(realSlider.value))
			.reduce((prev, curr) => prev + curr.offsetWidth, 0);
		previousGripPosition -= handleWidth
		sliderHandle.style.transform = `translate(${previousGripPosition}px)`;
	}

	document.addEventListener("DOMContentLoaded", () => {
		sliderPoints = [...document.querySelectorAll(".fields-slider__item")];
		getPointsCoordinates();
		realSlider = document.querySelector(".fields-slider__init");
		sliderHandle = document.querySelector(".fields-slider__handle");
		let grip = false;
		getPreviousGripPosition();
		sliderHandle.addEventListener("mousedown", e => {
			e.preventDefault();
			initialGripPosition = sliderPointsCoordinates.reduce((prev, curr) => {
				return (Math.abs(curr - e.clientX) < Math.abs(prev - e.clientX) ? curr : prev)
			});
			grip = true;
    });
    sliderHandle.addEventListener("touchstart", e => {
			e.preventDefault();
			initialGripPosition = sliderPointsCoordinates.reduce((prev, curr) => {
				return (Math.abs(curr - e.touches[0].clientX) < Math.abs(prev - e.touches[0].clientX) ? curr : prev)
			});
			grip = true;
		});
		document.addEventListener("mousemove", e => {
			if (grip) {
				sliderPointsCoordinates.forEach((coordinate, index) => {
					if (e.clientX + 20 >= coordinate && coordinate >= e.clientX - 20) {
						sliderHandle.style.transform = `translate(${previousGripPosition + (coordinate - initialGripPosition)}px)`;
						realSlider.value = index + 1;
					};
				});
			}
    })
    document.addEventListener("touchmove", e => {
			if (grip) {
				sliderPointsCoordinates.forEach((coordinate, index) => {
					if (e.touches[0].clientX + 10 >= coordinate && coordinate >= e.touches[0].clientX - 10) {
						sliderHandle.style.transform = `translate(${previousGripPosition + (coordinate - initialGripPosition)}px)`;
						realSlider.value = index + 1;
					};
				});
			}
		})
		document.addEventListener("mouseup", e => {
			e.preventDefault();
			previousGripPosition = Number(sliderHandle.style.transform.match(/-?\d+/)[0]);
			grip = false;
			initialGripPosition = undefined;
    });
    document.addEventListener("touchend", e => {
			e.preventDefault();
			previousGripPosition = Number(sliderHandle.style.transform.match(/-?\d+/)[0]);
			grip = false;
			initialGripPosition = undefined;
		});
	})
	window.addEventListener("resize", () => {
		getPointsCoordinates()
		getPreviousGripPosition()
	})
})();