// Copyright 2018, University of Colorado Boulder

/**
 * Displays '(x, y)' coordinates for a location.  If the location is null, this displays '(?, ?)'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

  // strings
  const coordinateUnknownString = require( 'string!GRAPHING_QUADRATICS/coordinateUnknown' );
  const pointXYString = require( 'string!GRAPHING_QUADRATICS/pointXY' );

  class CoordinatesNode extends Node {

    /**
     * @param {Property.<Vector2|null>}coordinatesProperty
     * @param {Object} [options]
     */
    constructor( coordinatesProperty, options ) {

      options = _.extend( {
        font: new PhetFont( 16 ),
        foregroundColor: 'black',
        backgroundColor: 'white',
        cornerRadius: 4,
        decimals: 0,
        xMargin: 4,
        yMargin: 2
      }, options );

      // the coordinates
      const foregroundNode = new Text( '', {
        font: options.font,
        fill: options.foregroundColor
      } );

      // rectangle behind the coordinates
      const backgroundNode = new Rectangle( 0, 0, 1, 1, {
        fill: options.backgroundColor,
        cornerRadius: options.cornerRadius
      } );

      assert && assert( !options.children, 'CoordinatesNode sets children' );
      options.children = [ backgroundNode, foregroundNode ];

      super( options );

      const coordinatesListener = coordinates => {

        // coordinates
        foregroundNode.text = StringUtils.fillIn( pointXYString, {
          x: coordinates ? Util.toFixedNumber( coordinates.x, options.decimals ) : coordinateUnknownString,
          y: coordinates ? Util.toFixedNumber( coordinates.y, options.decimals ) : coordinateUnknownString
        } );

        // resize background
        backgroundNode.setRect( 0, 0,
          foregroundNode.width + ( 2 * options.xMargin ), foregroundNode.height + ( 2 * options.yMargin ) );

        // center coordinates in background
        foregroundNode.center = backgroundNode.center;
      };
      coordinatesProperty.link( coordinatesListener );

      // @private
      this.disposeCoordinatesNode = function() {
        coordinatesProperty.unlink( coordinatesListener );
      };

      // @private for use in other methods
      this.foregroundNode = foregroundNode;
      this.backgroundNode = backgroundNode;
    }

    dispose() {
      this.disposeCoordinatesNode();
      super.dispose();
    }

    set foregroundColor( color ) { this.setForegroundColor( color ); }

    set backgroundColor( color ) { this.setBackgroundColor( color ); }

    /**
     * Sets the foreground color.
     * @param {Color|string} color
     */
    setForegroundColor( color ) { this.foregroundNode.fill = color; }

    /**
     * Sets the background color.
     * @param {Color|string} color
     */
    setBackgroundColor( color ) { this.backgroundNode.fill = color; }
  }

  return graphingQuadratics.register( 'CoordinatesNode', CoordinatesNode );
} );