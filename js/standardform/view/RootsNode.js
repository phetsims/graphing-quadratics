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
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NullableIO = require( 'TANDEM/types/NullableIO' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

  // constants
  const COORDINATES_X_SPACING = 15; // between root point and its coordinates display

  class RootsNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} rootsVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, graph, modelViewTransform,
                 rootsVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {
        radius: 10,
        tandem: Tandem.required
      }, options );

      // options common to both points
      const pointOptions = {
        fill: GQColors.ROOTS,
        center: modelViewTransform.modelToViewXY( graph.xRange.getCenter(), graph.yRange.getCenter() )
      };

      // points
      const leftRootNode = new Circle( options.radius, pointOptions );
      const rightRootNode = new Circle( options.radius, pointOptions );
      
      // options common to both Property instances
      const coordinatesPropertyOptions = {
        isValidValue: value => ( value instanceof Vector2 || value === null ),
        phetioType: DerivedPropertyIO( NullableIO( Vector2IO ) )
      };

      // coordinates corresponding to the quadratic's left or single root (if it has roots)
      const leftCoordinatesProperty = new DerivedProperty( [ quadraticProperty ],
        quadratic => ( quadratic.roots && quadratic.roots.length > 0 ) ? quadratic.roots[ 0 ] : null, 
        _.extend( {}, coordinatesPropertyOptions, {
          phetioDocumentation: 'coordinates displayed on the left (first) root, ' +
                               'null if there are no roots or if all points are roots'
        } ) );

      // coordinates corresponding to the quadratic's right root, if it has 2 roots
      const rightCoordinatesProperty = new DerivedProperty( [ quadraticProperty ],
        quadratic => ( quadratic.roots && quadratic.roots.length === 2 ) ? quadratic.roots[ 1 ] : null, 
        _.extend( {}, coordinatesPropertyOptions, {
          phetioDocumentation: 'coordinates displayed on the right (second) root, ' +
                               'null if there are less that two roots or if all points are roots'
        } ) );

      // options common to both CoordinatesNode instances 
      const coordinatesNodeOptions = {
        foregroundColor: 'white',
        backgroundColor: GQColors.ROOTS,
        decimals: GQConstants.ROOTS_DECIMALS
      };
      
      // coordinate displays
      const leftCoordinatesNode = new CoordinatesNode( leftCoordinatesProperty, coordinatesNodeOptions );
      const rightCoordinatesNode = new CoordinatesNode( rightCoordinatesProperty, coordinatesNodeOptions );

      // decorate root with coordinates
      leftRootNode.addChild( leftCoordinatesNode );
      rightRootNode.addChild( rightCoordinatesNode );

      assert && assert( !options.children, 'RootsNode sets children' );
      options.children = [ leftRootNode, rightRootNode ];

      super( options );

      quadraticProperty.link( quadratic => {

        // start with both roots invisible, make visible the ones that are needed
        leftRootNode.visible = false;
        rightRootNode.visible = false;

        let roots = quadratic.roots;

        if ( roots && roots.length !== 0 ) {
          assert && assert( roots.length === 1 || roots.length === 2, 'unexpected number of roots: ' + roots.length );

          const leftRoot = roots[ 0 ];
          leftRootNode.translation = modelViewTransform.modelToViewPosition( leftRoot );
          leftRootNode.visible = graph.contains( leftRoot );

          if ( roots.length === 2 ) {
            const rightRoot = roots[ 1 ];
            assert && assert( leftRoot.x < rightRoot.x, 'unexpected order of roots: ' + roots );
            rightRootNode.translation = modelViewTransform.modelToViewPosition( rightRoot );
            rightRootNode.visible = graph.contains( rightRoot );
          }

          // position coordinates to left and right of roots
          leftCoordinatesNode.right = -( options.radius + COORDINATES_X_SPACING );
          leftCoordinatesNode.centerY = 0;
          rightCoordinatesNode.left = options.radius + COORDINATES_X_SPACING;
          rightCoordinatesNode.centerY = 0;
        }
      } );

      // visibility of this Node
      const visibileProperty = new DerivedProperty(
        [ rootsVisibleProperty, quadraticProperty ],
        ( rootsVisible, quadratic ) =>
          rootsVisible &&  // the Roots checkbox is checked
          !!quadratic.roots && // it is not the case that all points on the quadratic are roots
          quadratic.roots.length !== 0 // there is a least one root
        );
      visibileProperty.linkAttribute( this, 'visible' );

      // visibility of coordinates
      coordinatesVisibleProperty.linkAttribute( leftCoordinatesNode, 'visible' );
      coordinatesVisibleProperty.linkAttribute( rightCoordinatesNode, 'visible' );
    }
  }

  return graphingQuadratics.register( 'RootsNode', RootsNode );
} );