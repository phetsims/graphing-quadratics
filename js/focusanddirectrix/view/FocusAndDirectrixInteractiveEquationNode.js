// Copyright 2018-2021, University of Colorado Boulder

/**
 * Alternate vertex form equation, y = (1/(4p))(x - h)^2 + k, with coefficients that can be changed via sliders.
 * All sliders have a linear taper.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import { HBox } from '../../../../scenery/js/imports.js';
import { Line } from '../../../../scenery/js/imports.js';
import { Node } from '../../../../scenery/js/imports.js';
import { RichText } from '../../../../scenery/js/imports.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import GQSlider from '../../common/view/GQSlider.js';
import graphingQuadratics from '../../graphingQuadratics.js';

class FocusAndDirectrixInteractiveEquationNode extends Node {

  /**
   * Constructor parameters are coefficients of the alternate vertex form: y = (1/(4p))(x - h)^2 + k
   * @param {NumberProperty} pProperty
   * @param {NumberProperty} hProperty
   * @param {NumberProperty} kProperty
   * @param {Object} [options]
   */
  constructor( pProperty, hProperty, kProperty, options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // equation
    const equationNode = new EquationNode( pProperty, hProperty, kProperty, {
      tandem: options.tandem.createTandem( 'equationNode' ),
      phetioDocumentation: 'the equation that changes as the sliders are adjusted'
    } );

    // value sliders
    const pSlider = new GQSlider( GQSymbols.p, pProperty, {

      // p=0 is not supported by this sim because it results in division by zero for 1/(4p).
      // see https://github.com/phetsims/graphing-quadratics/issues/31
      skipZero: true,
      interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_P,
      labelColor: GQColors.FOCUS_AND_DIRECTRIX_P,
      tandem: options.tandem.createTandem( 'pSlider' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.SLIDER_DOC, { symbol: 'p' } )
    } );
    const hSlider = new GQSlider( GQSymbols.h, hProperty, {
      interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_H,
      labelColor: GQColors.FOCUS_AND_DIRECTRIX_H,
      tandem: options.tandem.createTandem( 'hSlider' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.SLIDER_DOC, { symbol: 'h' } )
    } );
    const kSlider = new GQSlider( GQSymbols.k, kProperty, {
      interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_K,
      labelColor: GQColors.FOCUS_AND_DIRECTRIX_K,
      tandem: options.tandem.createTandem( 'kSlider' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.SLIDER_DOC, { symbol: 'k' } )
    } );

    assert && assert( !options.children, 'FocusAndDirectrixInteractiveEquationNode sets children' );
    options.children = [ equationNode, pSlider, hSlider, kSlider ];

    super( options );

    // horizontally align sliders under their associated values in the equation
    const ySpacing = 3;
    pSlider.x = this.globalToLocalBounds( equationNode.pGlobalBounds ).centerX;
    pSlider.top = equationNode.bottom + ySpacing;
    hSlider.x = this.globalToLocalBounds( equationNode.hGlobalBounds ).centerX;
    hSlider.top = equationNode.bottom + ySpacing;
    kSlider.x = this.globalToLocalBounds( equationNode.kGlobalBounds ).centerX;
    kSlider.top = equationNode.bottom + ySpacing;
  }
}

graphingQuadratics.register( 'FocusAndDirectrixInteractiveEquationNode', FocusAndDirectrixInteractiveEquationNode );

/**
 * The equation that appears above the sliders.
 */
class EquationNode extends Node {

  /**
   * @param {NumberProperty} pProperty
   * @param {NumberProperty} hProperty
   * @param {NumberProperty} kProperty
   * @param {Object} [options]
   */
  constructor( pProperty, hProperty, kProperty, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    assert && assert( pProperty.range, 'missing pProperty.range' );
    assert && assert( hProperty.range, 'missing hProperty.range' );
    assert && assert( kProperty.range, 'missing kProperty.range' );

    // options for parts of the equation
    const equationOptions = {
      font: GQConstants.INTERACTIVE_EQUATION_FONT
    };
    const xyOptions = merge( {}, equationOptions, {
      maxWidth: 20 // determined empirically
    } );

    // y
    const yNode = new RichText( GQSymbols.y, xyOptions );

    // =
    const equalsNode = new RichText( MathSymbols.EQUAL_TO, equationOptions );

    // 1
    const numeratorNode = new RichText( '1', equationOptions );

    // 4(
    const fourParenNode = new RichText( '4(', equationOptions );

    // p value
    const pNode = new NumberDisplay( pProperty, pProperty.range,
      merge( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
        textOptions: {
          fill: GQColors.FOCUS_AND_DIRECTRIX_P
        },
        decimalPlaces: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_P
      } ) );

    // )
    const parenNode = new RichText( ')', equationOptions );

    // 4(p)
    const denominatorNode = new HBox( {
      align: 'center',
      children: [ fourParenNode, pNode, parenNode ]
    } );

    // horizontal line between numerator and denominator
    const fractionLineLength = 1.1 * Math.max( numeratorNode.width, denominatorNode.width );
    const fractionLine = new Line( 0, 0, fractionLineLength, 0, {
      stroke: 'black',
      lineWidth: 1
    } );

    // 1/4p
    const fractionNode = new VBox( {
      spacing: 2,
      align: 'center',
      children: [ numeratorNode, fractionLine, denominatorNode ],
      scale: 0.85
    } );

    // (
    const anotherParenNode = new RichText( '(', equationOptions );

    // x
    const xNode = new RichText( GQSymbols.x, xyOptions );

    // -
    const minusNode = new RichText( MathSymbols.MINUS, equationOptions );

    // h value
    const hNode = new NumberDisplay( hProperty, hProperty.range,
      merge( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
        textOptions: {
          fill: GQColors.FOCUS_AND_DIRECTRIX_H
        },
        decimalPlaces: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_H
      } ) );

    // )^2
    const parenSquaredNode = new RichText( ')<sup>2</sup>', equationOptions );

    // +
    const plusNode = new RichText( MathSymbols.PLUS, equationOptions );

    // k value
    const kNode = new NumberDisplay( kProperty, kProperty.range,
      merge( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
        textOptions: {
          fill: GQColors.FOCUS_AND_DIRECTRIX_K
        },
        decimalPlaces: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_K
      } ) );

    // layout
    equalsNode.left = yNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
    fractionNode.left = equalsNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
    fractionNode.centerY = equalsNode.centerY;
    anotherParenNode.left = fractionNode.right + GQConstants.EQUATION_TERM_SPACING;
    xNode.left = anotherParenNode.right + GQConstants.EQUATION_TERM_SPACING;
    minusNode.left = xNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
    hNode.left = minusNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
    parenSquaredNode.left = hNode.right + GQConstants.EQUATION_TERM_SPACING;
    plusNode.left = parenSquaredNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
    kNode.left = plusNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
    hNode.bottom = equalsNode.bottom;
    kNode.bottom = equalsNode.bottom;

    // y = (1/(4p))(x - h)^2 + k
    assert && assert( !options.children, 'EquationNode sets children' );
    options.children = [ yNode, equalsNode, fractionNode,
      anotherParenNode, xNode, minusNode, hNode, parenSquaredNode, plusNode, kNode ];

    super( options );

    // @private needed by methods
    this.pNode = pNode;
    this.hNode = hNode;
    this.kNode = kNode;
  }

  // @public Gets the global {Bounds2} of p, h, k, used for layout
  get pGlobalBounds() { return this.getGlobalBoundsForNode( this.pNode ); }

  get hGlobalBounds() { return this.getGlobalBoundsForNode( this.hNode ); }

  get kGlobalBounds() { return this.getGlobalBoundsForNode( this.kNode ); }

  // @private gets the global bounds of a descendent Node
  getGlobalBoundsForNode( node ) { return node.localToGlobalBounds( node.localBounds ); }
}

export default FocusAndDirectrixInteractiveEquationNode;