// Copyright 2018, University of Colorado Boulder

/**
 * Displays the focus point as a non-interactive point with coordinates label.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const Color = require( 'SCENERY/util/Color' );
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );

  // constants
  const Y_SPACING = 5;

  class FocusNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, modelViewTransform, coordinatesVisibleProperty, options ) {

      options = _.extend( {
        radius: 10
      }, options );

      const pointNode = new Circle( options.radius, {
        fill: GQColors.FOCUS,
        x: 0,
        y: 0
      } );

      const coordinatesProperty = new Property( quadraticProperty.value.focus );

      // dispose not needed
      const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.FOCUS ).withAlpha( 0.75 ),
        decimals: 2
      } );

      assert && assert( !options.children, 'FocusNode sets children' );
      options.children = [ pointNode, coordinatesNode ];

      super( options );

      // unlink not needed
      quadraticProperty.link( quadratic => {

        coordinatesProperty.value = quadratic.focus;

        this.visible = !!quadratic.focus;

        if ( this.visible ) {

          // move to the focus location
          this.translation = modelViewTransform.modelToViewPosition( quadratic.focus );

          // position coordinates on the inside of the curve
          coordinatesNode.centerX = 0;
          if ( quadratic.a > 0 ) {
            coordinatesNode.bottom = pointNode.top - Y_SPACING;
          }
          else {
            coordinatesNode.top = pointNode.bottom + Y_SPACING;
          }
        }
      } );

      // unlink not needed
      coordinatesVisibleProperty.link( coordinatesVisible => { coordinatesNode.visible = coordinatesVisible; } );
    }
  }

  return graphingQuadratics.register( 'FocusNode', FocusNode );
} );