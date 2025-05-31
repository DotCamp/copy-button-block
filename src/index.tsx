import { registerBlockType, BlockEditProps } from '@wordpress/blocks';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    store,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    SelectControl,
    Button,
    ColorIndicator,
    Dropdown,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { ColorPalette } from "@wordpress/block-editor";
import { Color } from "@wordpress/components/build-types/palette-edit/types";
import { __ } from '@wordpress/i18n';
import './style.css';
import React from 'react';

interface CopyButtonAttrs {
    text: string;
    buttonText: string;
    copiedText: string;
    buttonColor: string;
    textColor: string;
    buttonSize: 'small' | 'medium' | 'large';
    alignment: 'left' | 'center' | 'right';
}

export interface ColorPickerDropdownProps {
    label: string;
    value: string;
    onChange: (value?: string) => void;
    colors?: Color[];
}

const ColorPickerDropdown = (props: ColorPickerDropdownProps) => {
    return (
        <Dropdown
            className="tableberg-dropdown-color-picker"
            contentClassName="tbdcp-picker"
            popoverProps={{ placement: "bottom-start" }}
            renderToggle={({ isOpen, onToggle }) => (
                <Button
                    className="tbdcp-dropdown-handle"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                >
                    <ColorIndicator colorValue={props.value} />
                    <label className="tbdcp-label">{props.label}</label>
                </Button>
            )}
            renderContent={() => (
                <ColorPalette
                    value={props.value}
                    onChange={props.onChange}
                    colors={props.colors || []}
                />
            )}
        />
    );
};

function edit({ attributes, setAttributes }: BlockEditProps<CopyButtonAttrs>) {
    const {
        text,
        buttonText,
        copiedText,
        buttonColor,
        textColor,
        buttonSize,
    } = attributes;

    const blockProps = useBlockProps();

    const themeColors = useSelect((select) => {
        return select(store).getSettings()?.__experimentalFeatures
            ?.color.palette.theme;
    }, []);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Button Settings', 'dotcamp/copy-button')}>
                    <TextControl
                        label={__('Text to Copy', 'dotcamp/copy-button')}
                        value={text}
                        onChange={(value: string) => setAttributes({ text: value })}
                    />
                    <TextControl
                        label={__('Copied Text', 'dotcamp/copy-button')}
                        value={copiedText}
                        onChange={(value: string) => setAttributes({ copiedText: value })}
                    />
                </PanelBody>
                <ToolsPanel
                    label={__("Button Settings", "dotcamp/copy-button")}
                    resetAll={() => { }}
                >
                    <ToolsPanelItem
                        label={__("Button Color", "dotcamp/copy-button")}
                        hasValue={() => !!buttonColor}
                        onDeselect={() => setAttributes({ buttonColor: "" })}
                        isShownByDefault
                    >
                        <ColorPickerDropdown
                            label={__('Button Color', 'dotcamp/copy-button')}
                            value={buttonColor}
                            onChange={(value) => value && setAttributes({ buttonColor: value })}
                            colors={themeColors}
                        />
                        <ColorPickerDropdown
                            label={__('Text Color', 'dotcamp/copy-button')}
                            value={textColor}
                            onChange={(value) => value && setAttributes({ textColor: value })}
                            colors={themeColors}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <PanelBody>
                    <SelectControl
                        label={__('Button Size', 'dotcamp/copy-button')}
                        value={buttonSize}
                        options={[
                            { label: __('Small', 'dotcamp/copy-button'), value: 'small' },
                            { label: __('Medium', 'dotcamp/copy-button'), value: 'medium' },
                            { label: __('Large', 'dotcamp/copy-button'), value: 'large' },
                        ]}
                        onChange={(value) => setAttributes({ buttonSize: value })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <button
                    className={`copy-button ${buttonSize}`}
                    style={{
                        backgroundColor: buttonColor,
                        color: textColor,
                    }}
                >
                    <RichText
                        tagName="span"
                        value={buttonText}
                        onChange={(value: string) => setAttributes({ buttonText: value })}
                        placeholder={__('Button text...', 'dotcamp/copy-button')}
                        allowedFormats={['bold', 'italic', 'underline']}
                    />
                </button>
            </div>
        </>
    );
}

// @ts-ignore
registerBlockType('dotcamp/copy-button', {
    edit,
    save: () => null, // Dynamic block, rendered via PHP
}); 