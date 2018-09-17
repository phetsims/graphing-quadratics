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
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
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
        decimals: GQConstants.POINT_DECIMALS
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

        let roots = quadratic.roots;

        if ( !roots || roots.length === 0 ) {
          this.visible = false;
          leftCoordinatesProperty.value = null;
          rightCoordinatesProperty.value = null;
        }
        else {
          assert && assert( roots.length === 1 || roots.length === 2, 'unexpected number of roots: ' + roots.length );

          this.visible = true;

          // sort by ascending x value
          roots = _.sortBy( roots, function( root ) { return root.x; } );

          leftCoordinatesProperty.value = roots[ 0 ];
          leftPointNode.translation = modelViewTransform.modelToViewPosition( roots[ 0 ] );
          if ( roots.length === 2 ) {
            assert && assert( roots[ 0 ].x < roots[ 1 ].x, 'unexpected order of roots: ' + roots );
            rightPointNode.visible = true;
            rightCoordinatesNode.visible = true;
            rightCoordinatesProperty.value = roots[ 1 ];
            rightPointNode.translation = modelViewTransform.modelToViewPosition( roots[ 1 ] );
          }
          else {
            // one root
            rightCoordinatesProperty.value = null;
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
        leftCoordinatesNode.visible = !!( coordinatesVisible && leftCoordinatesProperty.value );
        rightCoordinatesNode.visible = !!( coordinatesVisible && rightCoordinatesProperty.value );
      } );
    }
  }

  return graphingQuadratics.register( 'RootsNode', RootsNode );
} );