import { cubicOut } from 'svelte/easing'

/**
* `direction` (`block` | `inline`, default `block`) — direction along which the transition occurs (For left-to-right writing systems like English `block` corresponds to a vertical and `inline` to a horizontal slide transition)
*/
// @ts-ignore
export function logicalPropertiesHorizontalSlide(node, {
	delay = 0,
	duration = 400,
	easing = cubicOut,
	direction = 'block'
} = {}) {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	
	const capitalized_logical_property = `${direction[0].toUpperCase()}${direction.slice(1)}`;
	
	// @ts-ignore
	const size_value = parseFloat(style[`${direction}Size`]);
	// @ts-ignore
	const padding_start_value = parseFloat(style[`padding${capitalized_logical_property}Start`]);
	// @ts-ignore
	const padding_end_value = parseFloat(style[`padding${capitalized_logical_property}End`]);
	// @ts-ignore
	const margin_start_value = parseFloat(style[`margin${capitalized_logical_property}Start`]);
	// @ts-ignore
	const margin_end_value = parseFloat(style[`margin${capitalized_logical_property}End`]);
	// @ts-ignore
	const border_width_start_value = parseFloat(style[`border${capitalized_logical_property}StartWidth`]);
	// @ts-ignore
	const border_width_end_value = parseFloat(style[`border${capitalized_logical_property}EndWidth`]);
	
	return {
		delay,
		duration,
		easing,
		// @ts-ignore
		css: t =>
			'overflow: hidden;' +
			`opacity: ${Math.min(t * 20, 1) * opacity};` +
			`${direction}-size: ${t * size_value}px;` +
			`padding-${direction}-start: ${t * padding_start_value}px;` +
			`padding-${direction}-end: ${t * padding_end_value}px;` +
			`margin-${direction}-start: ${t * margin_start_value}px;` +
			`margin-${direction}-end: ${t * margin_end_value}px;` +
			`border-${direction}-start-width: ${t * border_width_start_value}px;` +
			`border-${direction}-start-width: ${t * border_width_end_value}px;`
	};
}
