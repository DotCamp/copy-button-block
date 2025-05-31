<?php
/**
 * Plugin Name:       Copy Button
 * Description:       A block to create a button to copy some text to clipboard
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.1
 * Author:            Dotcamp
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dotcamp/copy-button
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function dotcamp_render_copy_button_block($attributes) {
	$text = isset($attributes['text']) ? esc_attr($attributes['text']) : '';
	$button_text = isset($attributes['buttonText']) ? esc_html($attributes['buttonText']) : 'Copy';
	$copied_text = isset($attributes['copiedText']) ? esc_html($attributes['copiedText']) : 'Copied!';
	$button_color = isset($attributes['buttonColor']) ? esc_attr($attributes['buttonColor']) : '#0073aa';
	$text_color = isset($attributes['textColor']) ? esc_attr($attributes['textColor']) : '#ffffff';
	$button_size = isset($attributes['buttonSize']) ? esc_attr($attributes['buttonSize']) : 'medium';
	$alignment = isset($attributes['alignment']) ? esc_attr($attributes['alignment']) : 'left';

	$wrapper_attributes = get_block_wrapper_attributes([
		'style' => "text-align: $alignment;",
	]);

	$button_style = sprintf(
		'background-color: %s; color: %s;',
		$button_color,
		$text_color
	);

	$button_attributes = sprintf(
		'class="copy-button %s" style="%s" data-text="%s" data-copied-text="%s"',
		$button_size,
		$button_style,
		$text,
		$copied_text
	);

	return sprintf(
		'<div %s><button %s>%s</button></div>',
		$wrapper_attributes,
		$button_attributes,
		$button_text
	);
}

function dotcamp_copy_button_block_init() {
	register_block_type( __DIR__ . '/build', [
		'render_callback' => 'dotcamp_render_copy_button_block'
	] );
}

add_action( 'init', 'dotcamp_copy_button_block_init' );
