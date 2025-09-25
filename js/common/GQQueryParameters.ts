// Copyright 2018-2025, University of Colorado Boulder

/**
 * GQQueryParameters is the set of query parameters supported by this simulation.
 *
 * Running with ?log will print these query parameters and their values to the console,
 * as well as changes to selective model Properties.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';
import graphingQuadratics from '../graphingQuadratics.js';

const GQQueryParameters = QueryStringMachine.getAll( {

  // Point tools will snap ON to a curve when <= this distance from the curve, in model coordinates.
  // See https://github.com/phetsims/graphing-quadratics/issues/47
  // For internal use only.
  snapOnDistance: {
    type: 'number',
    defaultValue: 0.5,
    isValidValue: value => ( value > 0 )
  },

  // Point tools will snap OFF of a curve when > this distance from the curve, in model coordinates.
  // See https://github.com/phetsims/graphing-quadratics/issues/47
  // For internal use only.
  snapOffDistance: {
    type: 'number',
    defaultValue: 2,
    isValidValue: value => ( value > 0 )
  },

  // Distance that a point tool must be from a curve in order to register as being ON the curve, in model coordinates.
  // This should be less than the precision of the point tool (see GQConstants.POINT_TOOL_DECIMALS) in order to prevent
  // bogus "on curve" measurements when the contents of the graph are made visible via graphContentsVisibleProperty.
  // See https://github.com/phetsims/graphing-quadratics/issues/81
  // For internal use only.
  pointToolThreshold: {
    type: 'number',
    defaultValue: 0.005,
    isValidValue: value => ( value > 0 )
  },

  // Puts a red dot at the origin of Nodes that required transform debugging during implementation.
  // For internal use only.
  showOrigin: { type: 'flag' },

  // CSS color used for the translucent background behind equations on curves. Used for debugging.
  // For internal use only.
  equationsBackgroundColor: {
    type: 'string',
    defaultValue: 'white'
  },

  // Controls how often (in ms) the point tool keyboard drag listener fires when holding down the arrow keys.
  // Larger values make the point tool move slower.
  // See https://github.com/phetsims/graphing-quadratics/issues/238.
  pointToolMoveOnHoldInterval: {
    type: 'number',
    defaultValue: 22,
    isValidValue: value => ( value > 0 && value <= 200 )
  }
} );

graphingQuadratics.register( 'GQQueryParameters', GQQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.graphingQuadratics.GQQueryParameters' );

export default GQQueryParameters;