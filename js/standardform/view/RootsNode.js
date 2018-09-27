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
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const X_SPACING = 15;

  class RootsNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} rootsVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, modelViewTransform, rootsVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {
        radius: 10
      }, options );

      // points
      const pointOptions = {
        fill: GQColors.ROOTS,
        center: modelViewTransform.modelToViewPosition( Vector2.ZERO )
      };
      const leftPointNode = new Circle( options.radius, pointOptions );
      const rightPointNode = new Circle( options.radius, pointOptions );

      // coordinates Properties
      const propertyOptions = {
        isValidValue: value => { return value instanceof Vector2 || value === null; }
      };
      const leftCoordinatesProperty = new Property( null, propertyOptions );
      const rightCoordinatesProperty = new Property( null, propertyOptions );

      // coordinate displays
      const coordinatesOptions = {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.ROOTS ).withAlpha( 0.75 ),
        decimals: GQConstants.ROOTS_DECIMALS
      };
      const leftCoordinatesNode = new CoordinatesNode( leftCoordinatesProperty, coordinatesOptions );
      const rightCoordinatesNode = new CoordinatesNode( rightCoordinatesProperty, coordinatesOptions );

      assert && assert( !options.children, 'RootsNode sets children' );
      options.children = [ leftPointNode, leftCoordinatesNode, rightPointNode, rightCoordinatesNode ];

      super( options );

      quadraticProperty.link( quadratic => {

        // start with all subcomponents invisible, make visible the ones that are needed
        leftPointNode.visible = false;
        leftCoordinatesNode.visible = false;
        rightPointNode.visible = false;
        rightCoordinatesNode.visible = false;

        let roots = quadratic.roots;

        if ( roots && roots.length !== 0 ) {
          assert && assert( roots.length === 1 || roots.length === 2, 'unexpected number of roots: ' + roots.length );

          const leftRoot = roots[ 0 ];
          leftCoordinatesProperty.value = leftRoot;
          leftPointNode.visible = true;
          leftCoordinatesNode.visible = true;
          leftPointNode.translation = modelViewTransform.modelToViewPosition( leftRoot );

          if ( roots.length === 2 ) {
            const rightRoot = roots[ 1 ];
            assert && assert( leftRoot.x < rightRoot.x, 'unexpected order of roots: ' + roots );
            rightCoordinatesProperty.value = rightRoot;
            rightPointNode.visible = true;
            rightCoordinatesNode.visible = true;
            rightPointNode.translation = modelViewTransform.modelToViewPosition( rightRoot );
          }

          // position coordinates to left and right of roots
          leftCoordinatesNode.right = leftPointNode.left - X_SPACING;
          leftCoordinatesNode.centerY = leftPointNode.centerY;
          rightCoordinatesNode.left = rightPointNode.right + X_SPACING;
          rightCoordinatesNode.centerY = rightPointNode.centerY;
        }
      } );

      Property.multilink( [ rootsVisibleProperty, quadraticProperty ], ( rootsVisible, quadratic ) => {
        this.visible = !!( rootsVisible && quadratic.roots && quadratic.roots.length !== 0 );
      } );

      coordinatesVisibleProperty.link( visible => {
        leftCoordinatesNode.visible = !!( visible && leftCoordinatesProperty.value );
        rightCoordinatesNode.visible = !!( visible && rightCoordinatesProperty.value );
      } );
    }
  }

  return graphingQuadratics.register( 'RootsNode', RootsNode );
} );