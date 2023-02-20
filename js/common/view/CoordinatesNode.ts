// Copyright 2018-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Displays '(x, y)' coordinates.  If the coordinates are null, this displays '(?, ?)'.
 * Performance is optimized to update only when visible.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import { Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import GQConstants from '../GQConstants.js';

export default class CoordinatesNode extends Node {

  /**
   * @param {Property.<Vector2|null>} coordinatesProperty
   * @param {Object} [options]
   */
  constructor( coordinatesProperty, options ) {

    options = merge( {
      decimals: 0,
      font: GQConstants.COORDINATES_FONT,
      foregroundColor: 'black',
      backgroundColor: 'white',
      backgroundOpacity: 0.75,
      cornerRadius: 4,
      xMargin: 4,
      yMargin: 2,
      maxWidth: 100 // determined empirically
    }, options );

    // the coordinates
    const foregroundNode = new Text( '', {
      font: options.font,
      fill: options.foregroundColor
    } );

    // rectangle behind the coordinates
    const backgroundNode = new Rectangle( 0, 0, 1, 1, {
      fill: options.backgroundColor,
      opacity: options.backgroundOpacity,
      cornerRadius: options.cornerRadius
    } );

    assert && assert( !options.children, 'CoordinatesNode sets children' );
    options.children = [ backgroundNode, foregroundNode ];

    super( options );

    // @private needed by methods
    this.coordinatesProperty = coordinatesProperty;
    this.decimals = options.decimals;
    this.xMargin = options.xMargin;
    this.yMargin = options.yMargin;
    this.foregroundNode = foregroundNode;
    this.backgroundNode = backgroundNode;

    coordinatesProperty.link( coordinates => this.update( coordinates ) );
  }

  /**
   * Sets the foreground color, the color of the coordinates.
   * @param {Color|string} color
   * @public
   */
  set foreground( color ) { this.foregroundNode.fill = color; }

  /**
   * Sets the background color, the color of the rectangle behind the coordinates.
   * @param {Color|string} color
   * @public
   */
  set background( color ) { this.backgroundNode.fill = color; }

  /**
   * Updates this Node.
   * @param {Vector2} coordinates
   * @private
   */
  update( coordinates ) {

    // coordinates
    const x = coordinates ? Utils.toFixedNumber( coordinates.x, this.decimals ) : GraphingQuadraticsStrings.coordinateUnknown;
    const y = coordinates ? Utils.toFixedNumber( coordinates.y, this.decimals ) : GraphingQuadraticsStrings.coordinateUnknown;
    this.foregroundNode.text = `(${x}, ${y})`;

    // resize background
    this.backgroundNode.setRect( 0, 0,
      this.foregroundNode.width + ( 2 * this.xMargin ), this.foregroundNode.height + ( 2 * this.yMargin ) );

    // center coordinates in background
    this.foregroundNode.center = this.backgroundNode.center;
  }
}

graphingQuadratics.register( 'CoordinatesNode', CoordinatesNode );