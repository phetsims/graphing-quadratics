// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for standard form equation with integer cofficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberDisplay = require( 'SCENERY_PHET/NumberDisplay' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VerticalSlider = require( 'GRAPHING_QUADRATICS/common/view/VerticalSlider' );

  // strings
  const aString = require( 'string!GRAPHING_QUADRATICS/a' );
  const bString = require( 'string!GRAPHING_QUADRATICS/b' );
  const cString = require( 'string!GRAPHING_QUADRATICS/c' );
  const xSquaredString = require( 'string!GRAPHING_QUADRATICS/xSquared' );
  const xString = require( 'string!GRAPHING_QUADRATICS/x' );
  const yString = require( 'string!GRAPHING_QUADRATICS/y' );

  const TEXT_OPTIONS = { font: GQFont.MATH_SYMBOL_FONT };
  const READOUT_OPTIONS = {
    font: GQFont.NUMBER_FONT,
    numberFill: 'red',
    backgroundFill: null,
    backgroundStroke: null,
    decimalPlaces: 1,
    xMargin: 0,
    yMargin: 0
  };

  /**
   * @param {Property.<Quadratic|undefined>} quadraticProperty
   * @param {Object} [options]
   * @constructor
   */
  function DecimalsInteractiveEquationNode( quadraticProperty, options ) {

    var aProperty = new NumberProperty( 1, { range: { min: -6, max: 6 } } ) ;
    var bProperty = new NumberProperty( 0, { range: { min: -6, max: 6 } } ) ;
    var cProperty = new NumberProperty( 0, { range: { min: -6, max: 6 } } ) ;

    quadraticProperty.link( function( quadratic ) {
      aProperty.set( quadratic.a );
      bProperty.set( quadratic.b );
      cProperty.set( quadratic.c );
    } );

    Property.multilink( [ aProperty, bProperty, cProperty ], function( a, b, c ) {
      quadraticProperty.set( new Quadratic( a, b, c ) );
    } );

    const aReadout = new NumberDisplay(
      aProperty,
      aProperty.range,
      _.extend( {}, READOUT_OPTIONS, { decimalPlaces: 2 } )
    );
    const bReadout = new NumberDisplay( bProperty, bProperty.range, READOUT_OPTIONS );
    const cReadout = new NumberDisplay( cProperty, bProperty.range, READOUT_OPTIONS );

    const yText = new RichText( yString, TEXT_OPTIONS );
    const equalToText = new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS );
    const xSquaredText = new RichText( xSquaredString, TEXT_OPTIONS );
    const plusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );
    const xText = new RichText( xString, TEXT_OPTIONS );
    const secondPlusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );

    /**
     * Create slider and text
     *
     * @param {string} string
     * @param {NumberProperty} property
     * @param {number} decimalPlaces
     *
     * @returns {VBox}
     */
    function createControlBox( string, property, decimalPlaces ) {
      return new VBox( {
        children: [
          new Text( string, { font: GQFont.MATH_SYMBOL_FONT, fill: 'red' } ),
          new VerticalSlider( property, {
            constrainValue: function( value ) {
              return Util.toFixedNumber( value, decimalPlaces );
            }
          } )
        ],
        align: 'center'
      } );
    }

    const aControl = createControlBox( aString, aProperty, 2 );
    const bControl = createControlBox( bString, bProperty, 1 );
    const cControl = createControlBox( cString, cProperty, 1 );

    Node.call( this, {
      children: [
        yText,
        equalToText,
        aReadout,
        xSquaredText,
        plusText,
        bReadout,
        xText,
        secondPlusText,
        cReadout,
        aControl,
        bControl,
        cControl
      ]
    } );

    // alignment
    equalToText.left = yText.right + 10;
    aReadout.left = equalToText.right + 10;
    xSquaredText.left = aReadout.right + 5;
    plusText.left = xSquaredText.right + 10;
    bReadout.left = plusText.right + 10;
    xText.left = bReadout.right + 5;
    secondPlusText.left = xText.right + 10;
    cReadout.left = secondPlusText.right + 10;
    equalToText.bottom = yText.bottom;
    xSquaredText.bottom = yText.bottom;
    plusText.bottom = yText.bottom;
    xText.bottom = yText.bottom;
    secondPlusText.bottom = yText.bottom;
    aReadout.bottom = yText.bottom;
    bReadout.bottom = yText.bottom;
    cReadout.bottom = yText.bottom;
    aControl.centerX = aReadout.centerX;
    bControl.centerX = bReadout.centerX;
    cControl.centerX = cReadout.centerX;
    aControl.top = aReadout.bottom + 5;
    bControl.top = bReadout.bottom + 5;
    cControl.top = cReadout.bottom + 5;
  }

  graphingQuadratics.register( 'DecimalsInteractiveEquationNode', DecimalsInteractiveEquationNode );

  return inherit( HBox, DecimalsInteractiveEquationNode );
} );
