// Copyright 2018, University of Colorado Boulder

/**
 * Displays the roots of a quadratic as non-interactive points with coordinate labels.
 * There may be 0, 1 or 2 roots.
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
  const X_SPACING = 15;

  class RootsNode extends Node {

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

      // points
      const leftPointNode = new Circle( options.radius, { fill: GQColors.ROOTS } );
      const rightPointNode = new Circle( options.radius, { fill: GQColors.ROOTS } );

      // coordinates, dispose not needed
      const coordinatesOptions = {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.ROOTS ).withAlpha( 0.75 ),
        decimals: 2
      };
      const leftCoordinatesProperty = new Property( null );
      const rightCoordinatesProperty = new Property( null );
      const leftCoordinatesNode = new CoordinatesNode( leftCoordinatesProperty, coordinatesOptions );
      const rightCoordinatesNode = new CoordinatesNode( rightCoordinatesProperty, coordinatesOptions );

      assert && assert( !options.children, 'RootsNode sets children' );
      options.children = [ leftPointNode, leftCoordinatesNode, rightPointNode, rightCoordinatesNode ];

      super( options );

      // unlink not needed
      quadraticProperty.link( quadratic => {

        if ( !quadratic.roots || quadratic.roots.length === 0 ) {
          this.visible = false;
        }
        else {

          this.visible = true;

          assert && assert( quadratic.roots.length === 1 || quadratic.roots.length === 2,
            'unexpected number of roots: ' + quadratic.roots.length );
          leftCoordinatesProperty.value = quadratic.roots[ 0 ];
          leftPointNode.translation = modelViewTransform.modelToViewPosition( quadratic.roots[ 0 ] );
          if ( quadratic.roots.length === 2 ) {
            rightPointNode.visible = true;
            rightCoordinatesNode.visible = true;
            rightCoordinatesProperty.value = quadratic.roots[ 1 ];
            rightPointNode.translation = modelViewTransform.modelToViewPosition( quadratic.roots[ 1 ] );
          }
          else {
            // one root
            rightPointNode.visible = false;
            rightCoordinatesNode.visible = false;
          }
        }

        // position coordinates to left and right of roots
        if ( this.visible ) {

          leftCoordinatesNode.right = leftPointNode.left - X_SPACING;
          leftCoordinatesNode.centerY = leftPointNode.centerY;

          rightCoordinatesNode.left = rightPointNode.right + X_SPACING;
          rightCoordinatesNode.centerY = rightPointNode.centerY;
        }
      } );

      // unlink not needed
      coordinatesVisibleProperty.link( coordinatesVisible => {
        leftCoordinatesNode.visible = coordinatesVisible;
        rightCoordinatesNode.visible = coordinatesVisible;
      } );
    }
  }

  return graphingQuadratics.register( 'RootsNode', RootsNode );
} );