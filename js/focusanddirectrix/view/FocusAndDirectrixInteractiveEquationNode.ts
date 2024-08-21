// Copyright 2018-2024, University of Colorado Boulder

/**
 * Alternate vertex form equation, y = (1/(4p))(x - h)^2 + k, with coefficients that can be changed via sliders.
 * All sliders have a linear taper.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import NumberDisplay, { NumberDisplayOptions } from '../../../../scenery-phet/js/NumberDisplay.js';
import { HBox, Line, Node, NodeOptions, RichText, RichTextOptions, VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import LinearSlider from '../../common/view/LinearSlider.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Multilink from '../../../../axon/js/Multilink.js';

export default class FocusAndDirectrixInteractiveEquationNode extends Node {

  /**
   * Constructor parameters are coefficients of the alternate vertex form: y = (1/(4p))(x - h)^2 + k
   */
  public constructor( pProperty: NumberProperty, hProperty: NumberProperty, kProperty: NumberProperty, tandem: Tandem ) {

    const options: NodeOptions = {
      excludeInvisibleChildrenFromBounds: true,
      tandem: tandem,
      phetioDocumentation: 'the interactive equation in this accordion box',
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    };

    const equationOptions: RichTextOptions = {
      font: GQConstants.INTERACTIVE_EQUATION_FONT
    };
    const xyOptions = combineOptions<RichTextOptions>( {}, equationOptions, {
      maxWidth: 20 // determined empirically
    } );

    // y =
    const yText = new RichText( GQSymbols.yMarkupStringProperty, xyOptions );
    const equalToText = new RichText( MathSymbols.EQUAL_TO, equationOptions );

    // 1/4p
    const numeratorNode = new RichText( '1', equationOptions );
    const pNumberDisplay = new NumberDisplay( pProperty, pProperty.range,
      combineOptions<NumberDisplayOptions>( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
        textOptions: {
          fill: GQColors.focusAndDirectrixPColorProperty
        },
        decimalPlaces: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_P
      } ) );
    const denominatorNode = new HBox( {
      align: 'center',
      children: [ new RichText( '4(', equationOptions ), pNumberDisplay, new RichText( ')', equationOptions ) ]
    } );
    const fractionLine = new Line( 0, 0, 1.1 * Math.max( numeratorNode.width, denominatorNode.width ), 0, {
      stroke: 'black',
      lineWidth: 1
    } );
    const fractionNode = new VBox( {
      spacing: 2,
      align: 'center',
      children: [ numeratorNode, fractionLine, denominatorNode ],
      scale: 0.85
    } );

    // (x -
    const parentText = new RichText( '(', equationOptions );
    const xText = new RichText( GQSymbols.xMarkupStringProperty, xyOptions );
    const minusText = new RichText( MathSymbols.MINUS, equationOptions );

    // h
    const hNumberDisplay = new NumberDisplay( hProperty, hProperty.range,
      combineOptions<NumberDisplayOptions>( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
        textOptions: {
          fill: GQColors.focusAndDirectrixHColorProperty
        },
        decimalPlaces: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_H
      } ) );

    // )^2 +
    const parenSquaredText = new RichText( ')<sup>2</sup>', equationOptions );
    const plusText = new RichText( MathSymbols.PLUS, equationOptions );

    // k
    const kNumberDisplay = new NumberDisplay( kProperty, kProperty.range,
      combineOptions<NumberDisplayOptions>( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
        textOptions: {
          fill: GQColors.focusAndDirectrixKColorProperty
        },
        decimalPlaces: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_K
      } ) );

    // All parts of equation in one Node, for PhET-iO
    const equationNode = new Node( {
      children: [ yText, equalToText, fractionNode, parentText, xText, minusText, hNumberDisplay, parenSquaredText, plusText, kNumberDisplay ],
      tandem: tandem.createTandem( 'equationNode' ),
      phetioDocumentation: 'the equation that changes as the sliders are adjusted',
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    // p, h, k sliders
    const pSlider = new LinearSlider( GQSymbols.pMarkupStringProperty, pProperty, {

      // p=0 is not supported by this sim because it results in division by zero for 1/(4p).
      // see https://github.com/phetsims/graphing-quadratics/issues/31
      skipZero: true,
      interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_P,
      labelColor: GQColors.focusAndDirectrixPColorProperty,
      sliderOptions: {
        tandem: tandem.createTandem( 'pSlider' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.SLIDER_DOC, { symbol: 'p' } )
      }
    } );
    const hSlider = new LinearSlider( GQSymbols.hMarkupStringProperty, hProperty, {
      interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_H,
      labelColor: GQColors.focusAndDirectrixHColorProperty,
      sliderOptions: {
        tandem: tandem.createTandem( 'hSlider' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.SLIDER_DOC, { symbol: 'h' } )
      }
    } );
    const kSlider = new LinearSlider( GQSymbols.kMarkupStringProperty, kProperty, {
      interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_K,
      labelColor: GQColors.focusAndDirectrixKColorProperty,
      sliderOptions: {
      tandem: tandem.createTandem( 'kSlider' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.SLIDER_DOC, { symbol: 'k' } )
        }
    } );

    options.children = [ equationNode, pSlider, hSlider, kSlider ];

    super( options );

    // If any of the components that include dynamic text change their size, redo the layout.
    Multilink.multilink( [
        yText.boundsProperty, xText.boundsProperty,
        pNumberDisplay.boundsProperty, hNumberDisplay.boundsProperty, kNumberDisplay.boundsProperty
      ],
      () => {

        // equation layout
        equalToText.left = yText.right + GQConstants.EQUATION_OPERATOR_SPACING;
        fractionNode.left = equalToText.right + GQConstants.EQUATION_OPERATOR_SPACING;
        fractionNode.centerY = equalToText.centerY;
        parentText.left = fractionNode.right + GQConstants.EQUATION_TERM_SPACING;
        xText.left = parentText.right + GQConstants.EQUATION_TERM_SPACING;
        minusText.left = xText.right + GQConstants.EQUATION_OPERATOR_SPACING;
        hNumberDisplay.left = minusText.right + GQConstants.EQUATION_OPERATOR_SPACING;
        parenSquaredText.left = hNumberDisplay.right + GQConstants.EQUATION_TERM_SPACING;
        plusText.left = parenSquaredText.right + GQConstants.EQUATION_OPERATOR_SPACING;
        kNumberDisplay.left = plusText.right + GQConstants.EQUATION_OPERATOR_SPACING;
        hNumberDisplay.bottom = equalToText.bottom;
        kNumberDisplay.bottom = equalToText.bottom;

        // horizontally align sliders under their associated values in the equation
        const ySpacing = 3;
        pSlider.x = this.globalToLocalBounds( pNumberDisplay.getGlobalBounds() ).centerX;
        pSlider.top = equationNode.bottom + ySpacing;
        hSlider.x = hNumberDisplay.centerX;
        hSlider.top = equationNode.bottom + ySpacing;
        kSlider.x = kNumberDisplay.centerX;
        kSlider.top = equationNode.bottom + ySpacing;
      } );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixInteractiveEquationNode', FocusAndDirectrixInteractiveEquationNode );