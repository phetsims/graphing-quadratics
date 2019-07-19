// Copyright 2018-2019, University of Colorado Boulder

/**
 * Displays the roots of a quadratic as non-interactive points with coordinate labels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NullableIO = require( 'TANDEM/types/NullableIO' );
  const PointNode = require( 'GRAPHING_QUADRATICS/standardform/view/PointNode' );
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

        // phet-io
        tandem: Tandem.required,
        phetioDocumentation: 'displays the roots of the interactive quadratic'

      }, options );

      // options common to both Property instances
      const coordinatesPropertyOptions = {
        valueType: [ Vector2, null ],
        phetioType: DerivedPropertyIO( NullableIO( Vector2IO ) )
      };

      // coordinates corresponding to the quadratic's left or single root (if it has roots)
      const leftCoordinatesProperty = new DerivedProperty( [ quadraticProperty ],
        quadratic => ( quadratic.roots && quadratic.roots.length > 0 ) ? quadratic.roots[ 0 ] : null,
        _.extend( {}, coordinatesPropertyOptions, {
          tandem: options.tandem.createTandem( 'leftCoordinatesProperty' ),
          phetioDocumentation: 'coordinates displayed on the left (first) root, ' +
                               'null if there are no roots or if all points are roots'
        } ) );

      // coordinates corresponding to the quadratic's right root, if it has 2 roots
      const rightCoordinatesProperty = new DerivedProperty( [ quadraticProperty ],
        quadratic => ( quadratic.roots && quadratic.roots.length === 2 ) ? quadratic.roots[ 1 ] : null,
        _.extend( {}, coordinatesPropertyOptions, {
          tandem: options.tandem.createTandem( 'rightCoordinatesProperty' ),
          phetioDocumentation: 'coordinates displayed on the right (second) root, ' +
                               'null if there are less that two roots or if all points are roots'
        } ) );

      // options common to both PointNode instances
      const pointNodeOptions = {
        radius: modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS ),
        coordinatesForegroundColor: 'white',
        coordinatesBackgroundColor: GQColors.ROOTS,
        coordinatesDecimals: GQConstants.ROOTS_DECIMALS,
        x: modelViewTransform.modelToViewX( graph.xRange.getCenter() ),
        y: modelViewTransform.modelToViewY( graph.yRange.getCenter() )
      };

      // left root
      const leftRootNode = new PointNode( leftCoordinatesProperty, coordinatesVisibleProperty,
        _.extend( {}, pointNodeOptions, {
          layoutCoordinates: ( coordinates, coordinatesNode, pointNode ) => {
            coordinatesNode.right = pointNode.left - COORDINATES_X_SPACING;
            coordinatesNode.centerY = pointNode.centerY;
          },
          tandem: options.tandem.createTandem( 'leftRootNode' ),
          phetioDocumentation: 'the left (first) root'
        } ) );

      // right root
      const rightRootNode = new PointNode( rightCoordinatesProperty, coordinatesVisibleProperty,
        _.extend( {}, pointNodeOptions, {
          layoutCoordinates: ( coordinates, coordinatesNode, pointNode ) => {
            coordinatesNode.left = pointNode.right + COORDINATES_X_SPACING;
            coordinatesNode.centerY = pointNode.centerY;
          },
          tandem: options.tandem.createTandem( 'rightRootNode' ),
          phetioDocumentation: 'the right (second) root'
        } ) );

      assert && assert( !options.children, 'RootsNode sets children' );
      options.children = [ leftRootNode, rightRootNode ];

      super( options );

      quadraticProperty.link( quadratic => {

        // start with both roots invisible, make visible the ones that are needed
        leftRootNode.visible = false;
        rightRootNode.visible = false;

        const roots = quadratic.roots;

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
        }
      } );

      // visibility of this Node
      const visibleProperty = new DerivedProperty(
        [ rootsVisibleProperty, quadraticProperty ],
        ( rootsVisible, quadratic ) =>
          rootsVisible &&  // the Roots checkbox is checked
          !!quadratic.roots && // it is not the case that all points on the quadratic are roots
          quadratic.roots.length !== 0 // there is at least one root
      );
      visibleProperty.linkAttribute( this, 'visible' );
    }
  }

  return graphingQuadratics.register( 'RootsNode', RootsNode );
} );