// Copyright 2018, University of Colorado Boulder

/**
 * Interactive equation for the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CoefficientSlider = require( 'GRAPHING_QUADRATICS/common/view/CoefficientSlider' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class FocusAndDirectrixInteractiveEquationNode extends Node {

    /**
     * @param {Property.<Quadratic|undefined>} quadraticProperty
     * @param {RangeWithValue} pRange
     * @param {RangeWithValue} hRange
     * @param {RangeWithValue} kRange
     * @param {Object} [options]
     */
    constructor( quadraticProperty, pRange, hRange, kRange, options ) {

      options = options || {};

      // coefficient Properties
      const pProperty = new NumberProperty( pRange.defaultValue, { range: pRange } );
      const hProperty = new NumberProperty( hRange.defaultValue, { range: hRange } );
      const kProperty = new NumberProperty( kRange.defaultValue, { range: kRange } );

      // coefficient sliders
      const pSlider = new CoefficientSlider( GQSymbols.p, pProperty, {
        interval: GQConstants.FOCUS_AND_DIRECTRIX_SLIDER_INTERVAL_P,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_P
      } );
      const hSlider = new CoefficientSlider( GQSymbols.h, hProperty, {
        interval: GQConstants.FOCUS_AND_DIRECTRIX_SLIDER_INTERVAL_H,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_H
      } );
      const kSlider = new CoefficientSlider( GQSymbols.k, kProperty, {
        interval: GQConstants.FOCUS_AND_DIRECTRIX_SLIDER_INTERVAL_K,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_K
      } );

      var hBox = new HBox( {
        spacing: 40,
        children: [ pSlider, hSlider, kSlider ]
      } );

      assert && assert( !options.children, 'FocusAndDirectrixInteractiveEquationNode sets children' );
      options.children = [
        new VBox( {
          spacing: 10,
          children: [
            //TODO placeholder for dynamic equation
            new Rectangle( 0, 0, hBox.width, 75, { stroke: 'red' } ),
            hBox
          ]
        } )
      ];

      super( options );

      //TODO hack to prevent 'call stack size exceeded' and need for reentrant:true NumberProperty
      let changing = false;

      // When the coefficients change, update the quadratic.
      Property.multilink( [ pProperty, hProperty, kProperty ], ( p, h, k ) => {
        if ( !changing ) {
          changing = true;
          //TODO handle p === 0, which results in x=h
          if ( p !== 0 ) {
            quadraticProperty.value = Quadratic.createFromAlternateVertexForm( p, h, k, { color: quadraticProperty.value.color } );
          }
          changing = false;
        }
      } );

      // When the quadratic changes, update the coefficients
      quadraticProperty.link( quadratic => {
        if ( !changing ) {
          changing = true;
          //TODO handle non-quadratic
          if ( quadratic.a !== 0 ) {
            pProperty.value = quadratic.p;
            hProperty.value = quadratic.h;
            kProperty.value = quadratic.k;
          }
          changing = false;
        }
      } );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixInteractiveEquationNode', FocusAndDirectrixInteractiveEquationNode );
} );
