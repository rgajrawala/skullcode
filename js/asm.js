window.__asm_func = function(std, foriegn, heap) {
	'use asm';

	var _1 = new std.Uint8Array(heap);
	var $1 = new std.Int8Array(heap);
	var _2 = new std.Uint16Array(heap);
	var $2 = new std.Int16Array(heap);
	var _4 = new std.Uint32Array(heap);
	var $4 = new std.Int32Array(heap);
	var $f = new std.Float32Array(heap);
	var $d = new std.Float64Array(heap);

	var abs = std.Math.abs;
	var atan2 = std.Math.atan2;
	var ceil = std.Math.ceil;
	var cos = std.Math.cos;
	var exp = std.Math.exp;
	var floor = std.Math.floor;
	var fround = std.Math.fround;
	var log = std.Math.log;
	var sin = std.Math.sin;
	var sqrt = std.Math.sqrt;
	var tan = std.Math.tan;
	var error = foriegn.error;
	var imul = foriegn.imul;
	var logs = foriegn.logs;
	var logv = foriegn.logv;
	var wait = foriegn.wait;
	var time = foriegn.time;

	const E_NONE = 0;
	const E_PERM = 1;
	const E_NOMEM = 2;
	const E_INVALID = 3;
	const E_ACCESS = 4;
	const E_ALIGN = 5;
	const E_UNKNOWN = 6;
	const E_ENV = 7;
	const E_HALT = 8;
	const E_NOSUPPORT = 9;

	var version = 0x00000000;
	var spine = 0;
	var body = 0;
	var ini = 0;
	var dead = 1;
	var ring = 0;
	var lastError = 0;
	var lock0 = 0;
	var lock1 = 0;
	var lock2 = 0;
	var lock3 = 0;
	var fingerCnt = 0;
	var fing0 = 0;
	var fing1 = 0;
	var fing2 = 0;
	var fing3 = 0;
	var mark = 0;
	var born = 0.0;
	var delta = 0.0;
	var free = 0;
	var seed = 0;
	var v0 = 0;
	var v1 = 0;
	var v2 = 0;
	var v3 = 0;
	var f0 = 0.0;
	var op = 0;
	var cute = 0;
	var cmp = 0;
	var ret = 0;
	var rVirt = 0;
	var rSig = 0;
	var rHeap = 0;
	var rParam = 0;
	var rText = 0;
	var rEntity = 0;
	var rCode = 0;
	var rCall = 0;
	var attr = 0;

	function addition() {
		var slot = 0;
		var base = 0;
		var size = 0;
		var f = 0.0;
		var x0 = 0;
		var x1 = 0;
		var x2 = 0;
		var x3 = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (rHeap + v0) | 0;
							return;
						case 0x02:
							rParam = (rParam + v0) | 0;
							return;
						case 0x03:
							rText = (rText + v0) | 0;
							return;
						case 0x04:
							rEntity = (rEntity + v0) | 0;
							return;
						case 0x05:
							rCode = (rCode + v0) | 0;
							return;
						case 0x06:
							rCall = (rCall + v0) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (body + v0) | 0;
							return;
						case 0x0A:
							spine = (spine + v0) | 0;
							return;
						case 0x0B:
							free = (free + v0) | 0;
							return;
						case 0x0C:
							seed = (seed + v0) | 0;
							return;
						case 0x0D:
							rSig = (rSig + v0) | 0;
							return;
						case 0x0E:
							rVirt = (rVirt + v0) | 0;
							return;
						case 0x0F:
							op = (op + v0) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = (_1[base] >>> 0) + v0;
				return;
			case 1:
				_2[base >> 1] = (_2[base >> 1] >>> 0) + v0;
				return;
			case 2:
				_4[base >> 2] = (_4[base >> 2] >>> 0) + v0;
				return;
			case 3:
				slot = (_4[base >> 2] = (size = _4[base >> 2] | 0) + v0) | 0;
				base = (base + 4) | 0;
				if ((slot >>> 0) < (size >>> 0)) _4[base >> 2] = (_4[base >> 2] | 0) + v1 + 1;
				else _4[base >> 2] = (_4[base >> 2] | 0) + v1;
				return;
			case 4:
				x0 = _4[base >> 2] >>> 0;
				x1 = _4[(base + 4) >> 2] >>> 0;
				x2 = _4[(base + 8) >> 2] >>> 0;
				x3 = _4[(base + 12) >> 2] >>> 0;
				_4[base >> 2] = slot = (x0 + v0) | 0;
				if ((slot >>> 0) < (x0 >>> 0)) {
					x1 = ((slot = x1) + 1) | 0;
					if ((x1 >>> 0) < (slot >>> 0)) {
						x2 = ((slot = x2) + 1) | 0;
						if ((x2 >>> 0) < (slot >>> 0)) x3 = (x3 + 1) | 0;
					}
				}
				_4[(base + 4) >> 2] = slot = (x1 + v1) | 0;
				if ((slot >>> 0) < (x1 >>> 0)) {
					x2 = ((slot = x2) + 1) | 0;
					if ((x2 >>> 0) < (slot >>> 0)) x3 = (x3 + 1) | 0;
				}
				_4[(base + 8) >> 2] = slot = (x2 + v2) | 0;
				if ((slot >>> 0) < (x2 >>> 0)) x3 = (x3 + 1) | 0;
				_4[(base + 12) >> 2] = (x3 + v3) | 0;
				return;
			case 5:
				$f[base >> 2] = $f[base >> 2] + fround(f0);
				return;
			case 6:
				$d[base >> 3] = $d[base >> 3] + f0;
				return;
			case 7:
			default:
				err(E_NOSUPPORT);
		}
	}

	function attrib(fg, bg, ch) {
		fg = fg | 0;
		bg = bg | 0;
		ch = ch | 0;
		if (dead) return;
		attr = (((bg << 4) | fg) << 8) | ch;
	}

	function $_attrib(fg, bg, ch) {
		fg = fg | 0;
		bg = bg | 0;
		ch = ch | 0;
		if (notRoot() | 0) return;
		attrib(fg, bg, ch);
	}

	function bitAND() {
		var slot = 0;
		var base = 0;
		var size = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (rHeap & v0) | 0;
							return;
						case 0x02:
							rParam = (rParam & v0) | 0;
							return;
						case 0x03:
							rText = (rText & v0) | 0;
							return;
						case 0x04:
							rEntity = (rEntity & v0) | 0;
							return;
						case 0x05:
							rCode = (rCode & v0) | 0;
							return;
						case 0x06:
							rCall = (rCall & v0) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (body & v0) | 0;
							return;
						case 0x0A:
							spine = (spine & v0) | 0;
							return;
						case 0x0B:
							free = (free & v0) | 0;
							return;
						case 0x0C:
							seed = (seed & v0) | 0;
							return;
						case 0x0D:
							rSig = (rSig & v0) | 0;
							return;
						case 0x0E:
							rVirt = (rVirt & v0) | 0;
							return;
						case 0x0F:
							op = (op & v0) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = _1[base] & v0;
				return;
			case 1:
				_2[base >> 1] = _2[base >> 1] & v0;
				return;
			case 4:
				_4[(base + 12) >> 2] = _4[(base + 12) >> 2] & v3;
				_4[(base + 8) >> 2] = _4[(base + 8) >> 2] & v2;
			case 3:
				_4[(base + 4) >> 2] = _4[(base + 4) >> 2] & v1;
			case 2:
				_4[base >> 2] = _4[base >> 2] & v0;
				return;
			default:
				err(E_NOSUPPORT);
		}
	}

	function bitNOT() {
		var slot = 0;
		var base = 0;
		var size = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = ~v0;
							return;
						case 0x02:
							rParam = ~v0;
							return;
						case 0x03:
							rText = ~v0;
							return;
						case 0x04:
							rEntity = ~v0;
							return;
						case 0x05:
							rCode = ~v0;
							return;
						case 0x06:
							rCall = ~v0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = ~v0;
							return;
						case 0x0A:
							spine = ~v0;
							return;
						case 0x0B:
							free = ~v0;
							return;
						case 0x0C:
							seed = ~v0;
							return;
						case 0x0D:
							rSig = ~v0;
							return;
						case 0x0E:
							rVirt = ~v0;
							return;
						case 0x0F:
							op = ~v0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = ~v0;
				return;
			case 1:
				_2[base >> 1] = ~v0;
				return;
			case 4:
				_4[(base + 12) >> 2] = ~v3;
				_4[(base + 8) >> 2] = ~v2;
			case 3:
				_4[(base + 4) >> 2] = ~v1;
			case 2:
				_4[base >> 2] = ~v0;
				return;
			default:
				err(E_NOSUPPORT);
		}
	}

	function bitOR() {
		var slot = 0;
		var base = 0;
		var size = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (rHeap | v0) | 0;
							return;
						case 0x02:
							rParam = (rParam | v0) | 0;
							return;
						case 0x03:
							rText = (rText | v0) | 0;
							return;
						case 0x04:
							rEntity = (rEntity | v0) | 0;
							return;
						case 0x05:
							rCode = (rCode | v0) | 0;
							return;
						case 0x06:
							rCall = (rCall | v0) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (body | v0) | 0;
							return;
						case 0x0A:
							spine = (spine | v0) | 0;
							return;
						case 0x0B:
							free = (free | v0) | 0;
							return;
						case 0x0C:
							seed = (seed | v0) | 0;
							return;
						case 0x0D:
							rSig = (rSig | v0) | 0;
							return;
						case 0x0E:
							rVirt = (rVirt | v0) | 0;
							return;
						case 0x0F:
							op = (op | v0) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = _1[base] | v0;
				return;
			case 1:
				_2[base >> 1] = _2[base >> 1] | v0;
				return;
			case 4:
				_4[(base + 12) >> 2] = _4[(base + 12) >> 2] | v3;
				_4[(base + 8) >> 2] = _4[(base + 8) >> 2] | v2;
			case 3:
				_4[(base + 4) >> 2] = _4[(base + 4) >> 2] | v1;
			case 2:
				_4[base >> 2] = _4[base >> 2] | v0;
				return;
			default:
				err(E_NOSUPPORT);
		}
	}

	function bitSHL() {
		var slot = 0;
		var base = 0;
		var size = 0;
		if (cute & 0x8000) {
			if ((cute & 0x700) == 0x500) {
				cute = (cute - 0x300) | 0;
				getSrc();
			} else v0 = cute >>> 24;
		} else getSrc();
		if ((v0 | 0) == 0) return;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (rHeap << v0) | 0;
							return;
						case 0x02:
							rParam = (rParam << v0) | 0;
							return;
						case 0x03:
							rText = (rText << v0) | 0;
							return;
						case 0x04:
							rEntity = (rEntity << v0) | 0;
							return;
						case 0x05:
							rCode = (rCode << v0) | 0;
							return;
						case 0x06:
							rCall = (rCall << v0) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (body << v0) | 0;
							return;
						case 0x0A:
							spine = (spine << v0) | 0;
							return;
						case 0x0B:
							free = (free << v0) | 0;
							return;
						case 0x0C:
							seed = (seed << v0) | 0;
							return;
						case 0x0D:
							rSig = (rSig << v0) | 0;
							return;
						case 0x0E:
							rVirt = (rVirt << v0) | 0;
							return;
						case 0x0F:
							op = (op << v0) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = _1[base] << v0;
				return;
			case 1:
				_2[base >> 1] = _2[base >> 1] << v0;
				return;
			case 2:
				_4[base >> 2] = _4[base >> 2] << v0;
				return;
			case 3:
				if ((v0 | 0) >= 32) {
					_4[(base + 4) >> 2] = _4[base >> 2] << (v0 - 32);
					_4[base >> 2] = 0;
				} else {
					_4[base >> 2] = (slot = _4[base >> 2] | 0) << v0;
					_4[(base + 4) >> 2] = (_4[(base + 4) >> 2] << v0) | (slot >>> (32 - v0));
				}
				return;
			case 4:
				if ((v0 | 0) >= 96) {
					v0 = (v0 - 96) | 0;
					_4[(base + 12) >> 2] = _4[base >> 2] << v0;
					_4[(base + 8) >> 2] = _4[(base + 4) >> 2] = _4[base >> 2] = 0;
				} else if ((v0 | 0) > 64) {
					v0 = (v0 - 64) | 0;
					_4[(base + 12) >> 2] = (_4[(base + 4) >> 2] << v0) | ((size = _4[base >> 2] | 0) >>> (32 - v0));
					_4[(base + 8) >> 2] = size << v0;
					_4[(base + 4) >> 2] = _4[base >> 2] = 0;
				} else if ((v0 | 0) == 64) {
					_4[(base + 12) >> 2] = _4[(base + 4) >> 2] | 0;
					_4[(base + 8) >> 2] = _4[base >> 2] | 0;
					_4[(base + 4) >> 2] = _4[base >> 2] = 0;
				} else if ((v0 | 0) > 32) {
					v0 = (v0 - 32) | 0;
					_4[(base + 12) >> 2] = (_4[(base + 8) >> 2] << v0) | ((size = _4[(base + 4) >> 2] | 0) >>> (32 - v0));
					_4[(base + 8) >> 2] = (size << v0) | ((slot = _4[base >> 2] | 0) >>> (32 - v0));
					_4[(base + 4) >> 2] = slot << v0;
					_4[base >> 2] = 0;
				} else if ((v0 | 0) == 32) {
					_4[(base + 12) >> 2] = _4[(base + 8) >> 2] | 0;
					_4[(base + 8) >> 2] = _4[(base + 4) >> 2] | 0;
					_4[(base + 4) >> 2] = _4[base >> 2] | 0;
					_4[base >> 2] = 0;
				} else {
					_4[base >> 2] = (slot = _4[base >> 2] | 0) << v0;
					_4[(base + 4) >> 2] = ((size = _4[(base + 4) >> 2] | 0) << v0) | (slot >>> (32 - v0));
					_4[(base + 8) >> 2] = ((slot = _4[(base + 8) >> 2] | 0) << v0) | (size >>> (32 - v0));
					_4[(base + 12) >> 2] = (_4[(base + 12) >> 2] << v0) | (slot >>> (32 - v0));
				}
				return;
			default:
				err(E_NOSUPPORT);
		}
	}

	function bitSHR() {
		var slot = 0;
		var base = 0;
		var size = 0;
		if (cute & 0x8000) {
			if ((cute & 0x700) == 0x500) {
				cute = (cute - 0x300) | 0;
				getSrc();
			} else v0 = cute >>> 24;
		} else getSrc();
		if ((v0 | 0) == 0) return;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (rHeap >>> v0) | 0;
							return;
						case 0x02:
							rParam = (rParam >>> v0) | 0;
							return;
						case 0x03:
							rText = (rText >>> v0) | 0;
							return;
						case 0x04:
							rEntity = (rEntity >>> v0) | 0;
							return;
						case 0x05:
							rCode = (rCode >>> v0) | 0;
							return;
						case 0x06:
							rCall = (rCall >>> v0) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (body >>> v0) | 0;
							return;
						case 0x0A:
							spine = (spine >>> v0) | 0;
							return;
						case 0x0B:
							free = (free >>> v0) | 0;
							return;
						case 0x0C:
							seed = (seed >>> v0) | 0;
							return;
						case 0x0D:
							rSig = (rSig >>> v0) | 0;
							return;
						case 0x0E:
							rVirt = (rVirt >>> v0) | 0;
							return;
						case 0x0F:
							op = (op >>> v0) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = _1[base] >>> v0;
				return;
			case 1:
				_2[base >> 1] = _2[base >> 1] >>> v0;
				return;
			case 2:
				_4[base >> 2] = _4[base >> 2] >>> v0;
				return;
			case 3:
				if ((v0 | 0) >= 32) {
					_4[base >> 2] = _4[(base + 4) >> 2] >>> (v0 & 0x1f);
					_4[(base + 4) >> 2] = 0;
				} else {
					_4[(base + 4) >> 2] = (slot = _4[(base + 4) >> 2] | 0) >>> v0;
					_4[base >> 2] = (_4[base >> 2] >>> v0) | (slot << (32 - v0));
				}
				return;
			case 4:
				if ((v0 | 0) >= 96) {
					v0 = v0 & 0x1f;
					_4[base >> 2] = _4[(base + 12) >> 2] >>> v0;
					_4[(base + 4) >> 2] = _4[(base + 8) >> 2] = _4[(base + 12) >> 2] = 0;
				} else if ((v0 | 0) > 64) {
					v0 = v0 & 0x1f;
					_4[(base + 4) >> 2] = (slot = _4[(base + 12) >> 2] | 0) >>> v0;
					_4[base >> 2] = (_4[(base + 8) >> 2] >>> v0) | (slot << (32 - v0));
					_4[(base + 8) >> 2] = _4[(base + 12) >> 2] = 0;
				} else if ((v0 | 0) == 64) {
					_4[base >> 2] = _4[(base + 8) >> 2] | 0;
					_4[(base + 4) >> 2] = _4[(base + 12) >> 2] | 0;
					_4[(base + 8) >> 2] = _4[(base + 12) >> 2] = 0
				} else if ((v0 | 0) > 32) {
					v0 = v0 & 0x1f;
					_4[base >> 2] = (_4[(base + 4) >> 2] >>> v0) | ((size = _4[(base + 8) >> 2] | 0) << (32 - v0));
					_4[(base + 4) >> 2] = (size >>> v0) | ((slot = _4[(base + 12) >> 2] | 0) << (32 - v0));
					_4[(base + 8) >> 2] = slot >>> v0;
					_4[(base + 12) >> 2] = 0;
				} else if ((v0 | 0) == 32) {
					_4[base >> 2] = _4[(base + 4) >> 2] | 0;
					_4[(base + 4) >> 2] = _4[(base + 8) >> 2] | 0;
					_4[(base + 8) >> 2] = _4[(base + 12) >> 2] | 0;
					_4[(base + 12) >> 2] = 0
				} else {
					_4[(base + 12) >> 2] = (slot = _4[(base + 12) >> 2] | 0) >>> v0;
					_4[(base + 8) >> 2] = ((size = _4[(base + 8) >> 2] | 0) >>> v0) | (slot << (32 - v0));
					_4[(base + 4) >> 2] = ((slot = _4[(base + 4) >> 2] | 0) >>> v0) | (size << (32 - v0));
					_4[base >> 2] = (_4[base >> 2] >>> v0) | (slot << (32 - v0));
				}
				return;
			default:
				err(E_NOSUPPORT);
		}
	}

	function bitSHRX() {
		var slot = 0;
		var base = 0;
		var size = 0;
		if (cute & 0x8000) {
			if ((cute & 0x700) == 0x500) {
				cute = (cute - 0x300) | 0;
				getSrc();
			} else v0 = cute >>> 24;
		} else getSrc();
		if ((v0 | 0) == 0) return;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (rHeap >> v0) | 0;
							return;
						case 0x02:
							rParam = (rParam >> v0) | 0;
							return;
						case 0x03:
							rText = (rText >> v0) | 0;
							return;
						case 0x04:
							rEntity = (rEntity >> v0) | 0;
							return;
						case 0x05:
							rCode = (rCode >> v0) | 0;
							return;
						case 0x06:
							rCall = (rCall >> v0) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (body >> v0) | 0;
							return;
						case 0x0A:
							spine = (spine >> v0) | 0;
							return;
						case 0x0B:
							free = (free >> v0) | 0;
							return;
						case 0x0C:
							seed = (seed >> v0) | 0;
							return;
						case 0x0D:
							rSig = (rSig >> v0) | 0;
							return;
						case 0x0E:
							rVirt = (rVirt >> v0) | 0;
							return;
						case 0x0F:
							op = (op >> v0) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = (_1[base] << 24) >> (24 + v0);
				return;
			case 1:
				_2[base >> 1] = (_2[base >> 1] << 16) >> (16 + v0);
				return;
			case 2:
				_4[base >> 2] = _4[base >> 2] >> v0;
				return;
			case 3:
				if ((v0 | 0) >= 32) {
					_4[base >> 2] = (slot = _4[(base + 4) >> 2] | 0) >> (v0 - 32);
					_4[(base + 4) >> 2] = slot >> 31;
				} else {
					_4[(base + 4) >> 2] = (slot = _4[(base + 4) >> 2] | 0) >> v0;
					_4[base >> 2] = (_4[base >> 2] >>> v0) | (slot << (32 - v0));
				}
				return;
			case 4:
				if ((v0 | 0) >= 96) {
					v0 = v0 & 0x1f;
					_4[base >> 2] = (slot = _4[(base + 12) >> 2] | 0) >> v0;
					_4[(base + 4) >> 2] = _4[(base + 8) >> 2] = _4[(base + 12) >> 2] = slot >> 31;
				} else if ((v0 | 0) > 64) {
					v0 = v0 & 0x1f;
					_4[(base + 4) >> 2] = (slot = _4[(base + 12) >> 2] | 0) >> v0;
					_4[base >> 2] = (_4[(base + 8) >> 2] >>> v0) | (slot << (32 - v0));
					_4[(base + 8) >> 2] = _4[(base + 12) >> 2] = slot >> 31;
				} else if ((v0 | 0) == 64) {
					_4[base >> 2] = _4[(base + 8) >> 2] | 0;
					_4[(base + 4) >> 2] = slot = _4[(base + 12) >> 2] | 0;
					_4[(base + 8) >> 2] = _4[(base + 12) >> 2] = slot >> 31;
				} else if ((v0 | 0) > 32) {
					v0 = v0 & 0x1f;
					_4[base >> 2] = (_4[(base + 4) >> 2] >>> v0) | ((size = _4[(base + 8) >> 2] | 0) << (32 - v0));
					_4[(base + 4) >> 2] = (size >>> v0) | ((slot = _4[(base + 12) >> 2] | 0) << (32 - v0));
					_4[(base + 8) >> 2] = slot >> v0;
					_4[(base + 12) >> 2] = slot >> 31;
				} else if ((v0 | 0) == 32) {
					_4[base >> 2] = _4[(base + 4) >> 2] | 0;
					_4[(base + 4) >> 2] = _4[(base + 8) >> 2] | 0;
					_4[(base + 8) >> 2] = slot = _4[(base + 12) >> 2] | 0;
					_4[(base + 12) >> 2] = slot >> 31;
				} else {
					_4[(base + 12) >> 2] = (slot = _4[(base + 12) >> 2] | 0) >> v0;
					_4[(base + 8) >> 2] = ((size = _4[(base + 8) >> 2] | 0) >>> v0) | (slot << (32 - v0));
					_4[(base + 4) >> 2] = ((slot = _4[(base + 4) >> 2] | 0) >>> v0) | (size << (32 - v0));
					_4[base >> 2] = (_4[base >> 2] >>> v0) | (slot << (32 - v0));
				}
				return;
			default:
				err(E_NOSUPPORT);
		}
	}

	function bitSpinL() {
		var slot = 0;
		var base = 0;
		var size = 0;
		if (cute & 0x8000) {
			if ((cute & 0x700) == 0x500) {
				cute = (cute - 0x300) | 0;
				getSrc();
			} else v0 = cute >>> 24;
		} else getSrc();
		if ((v0 | 0) == 0) return;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (rHeap << v0) | (rHeap >>> (v0 - 32));
							return;
						case 0x02:
							rParam = (rParam << v0) | (rParam >>> (v0 - 32));
							return;
						case 0x03:
							rText = (rText << v0) | (rText >>> (v0 - 32));
							return;
						case 0x04:
							rEntity = (rEntity << v0) | (rEntity >>> (v0 - 32));
							return;
						case 0x05:
							rCode = (rCode << v0) | (rCode >>> (v0 - 32));
							return;
						case 0x06:
							rCall = (rCall << v0) | (rCall >>> (v0 - 32));
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (body << v0) | (body >>> (v0 - 32));
							return;
						case 0x0A:
							spine = (spine << v0) | (spine >>> (v0 - 32));
							return;
						case 0x0B:
							free = (free << v0) | (free >>> (v0 - 32));
							return;
						case 0x0C:
							seed = (seed << v0) | (seed >>> (v0 - 32));
							return;
						case 0x0D:
							rSig = (rSig << v0) | (rSig >>> (v0 - 32));
							return;
						case 0x0E:
							rVirt = (rVirt << v0) | (rVirt >>> (v0 - 32));
							return;
						case 0x0F:
							op = (op << v0) | (op >>> (v0 - 32));
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = ((slot = _1[base] | 0) << v0) | (slot >>> (8 - v0));
				return;
			case 1:
				_2[base >> 1] = ((slot = _2[base >> 1] | 0) << v0) | (slot >>> (16 - v0));
				return;
			case 2:
				_4[base >> 2] = ((slot = _4[base >> 2] | 0) << v0) | (slot >>> (32 - v0));
				return;
			case 3:
				if ((v0 | 0) > 32) {
					v0 = (v0 - 32) | 0;
					_4[(base + 4) >> 2] = ((slot = _4[base >> 2] | 0) << v0) | ((size = _4[(base + 4) >> 2] | 0) >>> (32 - v0));
					_4[base >> 2] = (size << v0) | (slot >>> (32 - v0));
				} else if ((v0 | 0) == 32) {
					slot = _4[base >> 2] | 0;
					_4[base >> 2] = _4[(base + 4) >> 2];
					_4[(base + 4) >> 2] = slot;
				} else {
					_4[base >> 2] = ((slot = _4[base >> 2] | 0) << v0) | ((size = _4[(base + 4) >> 2] | 0) >>> (32 - v0));
					_4[(base + 4) >> 2] = (size << v0) | (slot >>> (32 - v0));
				}
				return;
			case 4:
				if ((v0 | 0) > 96) {
					v0 = v0 & 0x1f;
					_4[base >> 2] = ((size = _4[base >> 2] | 0) >>> (32 - v0)) | ((slot = _4[(base + 4) >> 2] | 0) << v0);
					_4[(base + 4) >> 2] = (slot >>> (32 - v0)) | ((slot = _4[(base + 8) >> 2] | 0) << v0);
					_4[(base + 8) >> 2] = (slot >>> (32 - v0)) | ((slot = _4[(base + 12) >> 2] | 0) << v0);
					_4[(base + 12) >> 2] = (slot >>> (32 - v0)) | (size << v0);
				} else if ((v0 | 0) == 96) {
					slot = _4[base >> 2] | 0;
					_4[base >> 2] = _4[(base + 4) >> 2];
					_4[(base + 4) >> 2] = _4[(base + 8) >> 2];
					_4[(base + 8) >> 2] = _4[(base + 12) >> 2];
					_4[(base + 12) >> 2] = slot;
				} else if ((v0 | 0) > 64) {
					slot = v0 & 0x1f;
					size = (32 - slot) | 0;
					v0 = _4[base >> 2] | 0;
					v1 = _4[(base + 4) >> 2] | 0;
					v2 = _4[(base + 8) >> 2] | 0;
					v3 = _4[(base + 12) >> 2] | 0;
					_4[base >> 2] = (v2 << slot) | (v1 >>> size);
					_4[(base + 4) >> 2] = (v3 << slot) | (v2 >>> size);
					_4[(base + 8) >> 2] = (v0 << slot) | (v3 >>> size);
					_4[(base + 12) >> 2] = (v1 << slot) | (v0 >>> size);
				} else if ((v0 | 0) == 64) {
					slot = _4[(base + 12) >> 2] | 0;
					size = _4[base >> 2] | 0;
					_4[(base + 12) >> 2] = _4[(base + 4) >> 2];
					_4[(base + 4) >> 2] = slot;
					_4[base >> 2] = _4[(base + 8) >> 2];
					_4[(base + 8) >> 2] = size;
				} else if ((v0 | 0) > 32) {
					slot = v0 & 0x1f;
					size = (32 - slot) | 0;
					v0 = _4[base >> 2] | 0;
					v1 = _4[(base + 4) >> 2] | 0;
					v2 = _4[(base + 8) >> 2] | 0;
					v3 = _4[(base + 12) >> 2] | 0;
					_4[base >> 2] = (v3 << slot) | (v2 >>> size);
					_4[(base + 4) >> 2] = (v0 << slot) | (v3 >>> size);
					_4[(base + 8) >> 2] = (v1 << slot) | (v0 >>> size);
					_4[(base + 12) >> 2] = (v2 << slot) | (v1 >>> size);
				} else if ((v0 | 0) == 32) {
					slot = _4[base >> 2] | 0;
					_4[base >> 2] = _4[(base + 12) >> 2];
					_4[(base + 12) >> 2] = _4[(base + 8) >> 2];
					_4[(base + 8) >> 2] = _4[(base + 4) >> 2];
					_4[(base + 4) >> 2] = slot;
				} else {
					_4[base >> 2] = ((size = _4[(base + 12) >> 2] | 0) >>> (32 - v0)) | ((slot = _4[base >> 2] | 0) << v0);
					_4[(base + 4) >> 2] = (slot >>> (32 - v0)) | ((slot = _4[(base + 4) >> 2] | 0) << v0);
					_4[(base + 8) >> 2] = (slot >>> (32 - v0)) | ((slot = _4[(base + 8) >> 2] | 0) << v0);
					_4[(base + 12) >> 2] = (slot >>> (32 - v0)) | (size << v0);
				}
				return;
			default:
				err(E_NOSUPPORT);
		}
	}

	function bitSpinR() {
		var slot = 0;
		var base = 0;
		var size = 0;
		if (cute & 0x8000) {
			if ((cute & 0x700) == 0x500) {
				cute = (cute - 0x300) | 0;
				getSrc();
			} else v0 = cute >>> 24;
		} else getSrc();
		if ((v0 | 0) == 0) return;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (rHeap >>> v0) | (rHeap << (v0 - 32));
							return;
						case 0x02:
							rParam = (rParam >>> v0) | (rParam << (v0 - 32));
							return;
						case 0x03:
							rText = (rText >>> v0) | (rText << (v0 - 32));
							return;
						case 0x04:
							rEntity = (rEntity >>> v0) | (rEntity << (v0 - 32));
							return;
						case 0x05:
							rCode = (rCode >>> v0) | (rCode << (v0 - 32));
							return;
						case 0x06:
							rCall = (rCall >>> v0) | (rCall << (v0 - 32));
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (body >>> v0) | (body << (v0 - 32));
							return;
						case 0x0A:
							spine = (spine >>> v0) | (spine << (v0 - 32));
							return;
						case 0x0B:
							free = (free >>> v0) | (free << (v0 - 32));
							return;
						case 0x0C:
							seed = (seed >>> v0) | (seed << (v0 - 32));
							return;
						case 0x0D:
							rSig = (rSig >>> v0) | (rSig << (v0 - 32));
							return;
						case 0x0E:
							rVirt = (rVirt >>> v0) | (rVirt << (v0 - 32));
							return;
						case 0x0F:
							op = (op >>> v0) | (op << (v0 - 32));
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = ((slot = _1[base] | 0) >>> v0) | (slot << (8 - v0));
				return;
			case 1:
				_2[base >> 1] = ((slot = _2[base >> 1] | 0) >>> v0) | (slot << (16 - v0));
				return;
			case 2:
				_4[base >> 2] = ((slot = _4[base >> 2] | 0) >>> v0) | (slot << (32 - v0));
				return;
			case 3:
				if ((v0 | 0) > 32) {
					v0 = (v0 - 32) | 0;
					_4[base >> 2] = ((slot = _4[(v1 = (base + 4) | 0) >> 2] | 0) >>> v0) | ((size = _4[base >> 2] | 0) << (32 - v0));
					_4[v1 >> 2] = (size >>> v0) | (slot << (32 - v0));
				} else if ((v0 | 0) == 32) {
					slot = _4[base >> 2] | 0;
					_4[base >> 2] = _4[(base + 4) >> 2];
					_4[(base + 4) >> 2] = slot;
				} else {
					_4[base >> 2] = ((slot = _4[base >> 2] | 0) >>> v0) | ((size = _4[(v1 = (base + 4) | 0) >> 2] | 0) << (32 - v0));
					_4[v1 >> 2] = (size >>> v0) | (slot << (32 - v0));
				}
				return;
			case 4:
				if ((v0 | 0) > 96) {
					v0 = (v0 - 96) | 0;
					_4[base >> 2] = ((size = _4[(base + 12) >> 2] | 0) >>> v0) | ((slot = _4[base >> 2] | 0) << (32 - v0));
					_4[(base + 4) >> 2] = (slot >>> v0) | ((slot = _4[(base + 4) >> 2] | 0) << (32 - v0));
					_4[(base + 8) >> 2] = (slot >>> v0) | ((slot = _4[(base + 8) >> 2] | 0) << (32 - v0));
					_4[(base + 12) >> 2] = (slot >>> v0) | (size << (32 - v0));
				} else if ((v0 | 0) == 96) {
					slot = _4[base >> 2] | 0;
					_4[base >> 2] = _4[(base + 12) >> 2];
					_4[(base + 12) >> 2] = _4[(base + 8) >> 2];
					_4[(base + 8) >> 2] = _4[(base + 4) >> 2];
					_4[(base + 4) >> 2] = slot;
				} else if ((v0 | 0) > 64) {
					slot = (v0 - 64) | 0;
					size = (32 - slot) | 0;
					v0 = _4[base >> 2] | 0;
					v1 = _4[(base + 4) >> 2] | 0;
					v2 = _4[(base + 8) >> 2] | 0;
					v3 = _4[(base + 12) >> 2] | 0;
					_4[base >> 2] = (v2 >>> slot) | (v3 << size);
					_4[(base + 4) >> 2] = (v3 >>> slot) | (v0 << size);
					_4[(base + 8) >> 2] = (v0 >>> slot) | (v1 << size);
					_4[(base + 12) >> 2] = (v1 >>> slot) | (v2 << size);
				} else if ((v0 | 0) == 64) {
					slot = _4[(base + 12) >> 2] | 0;
					size = _4[base >> 2] | 0;
					_4[(base + 12) >> 2] = _4[(base + 4) >> 2];
					_4[(base + 4) >> 2] = slot;
					_4[base >> 2] = _4[(base + 8) >> 2];
					_4[(base + 8) >> 2] = size;
				} else if ((v0 | 0) > 32) {
					slot = v0 & 0x1f;
					size = (32 - slot) | 0;
					v0 = _4[base >> 2] | 0;
					v1 = _4[(base + 4) >> 2] | 0;
					v2 = _4[(base + 8) >> 2] | 0;
					v3 = _4[(base + 12) >> 2] | 0;
					_4[base >> 2] = (v1 >>> slot) | (v2 << size);
					_4[(base + 4) >> 2] = (v2 >>> slot) | (v3 << size);
					_4[(base + 8) >> 2] = (v3 >>> slot) | (v0 << size);
					_4[(base + 12) >> 2] = (v0 >>> slot) | (v1 << size);
				} else if ((v0 | 0) == 32) {
					slot = _4[base >> 2] | 0;
					_4[base >> 2] = _4[(base + 4) >> 2];
					_4[(base + 4) >> 2] = _4[(base + 8) >> 2];
					_4[(base + 8) >> 2] = _4[(base + 12) >> 2];
					_4[(base + 12) >> 2] = slot;
				} else {
					_4[base >> 2] = ((slot = _4[base >> 2] | 0) >>> v0) | ((size = _4[(base + 4) >> 2] | 0) << (32 - v0));
					_4[(base + 4) >> 2] = (size >>> v0) | ((size = _4[(base + 8) >> 2] | 0) << (32 - v0));
					_4[(base + 8) >> 2] = (size >>> v0) | ((size = _4[(base + 12) >> 2] | 0) << (32 - v0));
					_4[(base + 12) >> 2] = (size >>> v0) | (slot << (32 - v0));
				}
				return;
			default:
				err(E_NOSUPPORT);
		}
	}

	function bitXOR() {
		var slot = 0;
		var base = 0;
		var size = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (rHeap ^ v0) | 0;
							return;
						case 0x02:
							rParam = (rParam ^ v0) | 0;
							return;
						case 0x03:
							rText = (rText ^ v0) | 0;
							return;
						case 0x04:
							rEntity = (rEntity ^ v0) | 0;
							return;
						case 0x05:
							rCode = (rCode ^ v0) | 0;
							return;
						case 0x06:
							rCall = (rCall ^ v0) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (body ^ v0) | 0;
							return;
						case 0x0A:
							spine = (spine ^ v0) | 0;
							return;
						case 0x0B:
							free = (free ^ v0) | 0;
							return;
						case 0x0C:
							seed = (seed ^ v0) | 0;
							return;
						case 0x0D:
							rSig = (rSig ^ v0) | 0;
							return;
						case 0x0E:
							rVirt = (rVirt ^ v0) | 0;
							return;
						case 0x0F:
							op = (op ^ v0) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = _1[base] ^ v0;
				return;
			case 1:
				_2[base >> 1] = _2[base >> 1] ^ v0;
				return;
			case 4:
				_4[(base + 12) >> 2] = _4[(base + 12) >> 2] ^ v3;
				_4[(base + 8) >> 2] = _4[(base + 8) >> 2] ^ v2;
			case 3:
				_4[(base + 4) >> 2] = _4[(base + 4) >> 2] ^ v1;
			case 2:
				_4[base >> 2] = _4[base >> 2] ^ v0;
				return;
			default:
				err(E_NOSUPPORT);
		}
	}

	function cls() {
		var i = 0;
		for (; (i | 0) < 8000; i = (i + 4) | 0) _4[i >> 2] = attr;
		_4[8004 >> 2] = _4[8004 >> 2] | 1;
	}

	function $_cls() {
		if (dead) return;
		cls();
	}

	function compare() {
		var slot = 0;
		var base = 0;
		var size = 0;
		var x0 = 0;
		var x1 = 0;
		var x2 = 0;
		var x3 = 0;
		var f = 0.0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							base = rHeap;
							break;
						case 0x02:
							base = rParam;
							break;
						case 0x03:
							base = rText;
							break;
						case 0x04:
							base = rEntity;
							break;
						case 0x05:
							base = rCode;
							break;
						case 0x06:
							base = rCall;
							break;
						case 0x07:
							base = (ring << 2) | cmp;
							break;
						case 0x08:
							err(E_INVALID);
							break;
						case 0x09:
							base = body;
							break;
						case 0x0A:
							base = spine;
							break;
						case 0x0B:
							base = free;
							break;
						case 0x0C:
							base = seed;
							break;
						case 0x0D:
							base = rSig;
							break;
						case 0x0E:
							base = rVirt;
							break;
						case 0x0F:
							base = (op - rCode) | 0;
							break;
						default:
							err(E_INVALID);
					}
					if (cmp = (base - v0) | 0) cmp = ((base ^ v0 ^ cmp) >>> 31) | (cmp & 0x80000001);
					else cmp = 2;
					return;
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		cmp = 0;
		switch (size | 0) {
			case 0:
				base = _1[base] >>> 0;
				if (cmp = (base - v0) | 0) cmp = (((base ^ v0 ^ cmp) >>> 7) | (cmp << 24)) & 0x80000001;
				else cmp = 2;
				return;
			case 1:
				base = _2[base >> 1] >>> 0;
				if (cmp = (base - v0) | 0) cmp = (((base ^ v0 ^ cmp) >>> 15) | (cmp << 16)) & 0x80000001;
				else cmp = 2;
				return;
			case 2:
				base = _4[base >> 2] >>> 0;
				if (cmp = (base - v0) | 0) cmp = ((base ^ v0 ^ cmp) >>> 31) | (cmp & 0x80000000);
				else cmp = 2;
				return;
			case 3:
				slot = ((size = _4[base >> 2] | 0) - v0) | 0;
				base = (base + 4) | 0;
				if ((slot >>> 0) > (size >>> 0)) cmp = ((_4[base >> 2] | 0) - v1 - 1) | 0;
				else cmp = ((base = _4[base >> 2] | 0) - v1) | 0;
				if (cmp | slot) cmp = ((base ^ v1 ^ cmp) >>> 31) | (cmp & 0x80000000);
				else cmp = 2;
				return;
			case 4:
				x0 = _4[base >> 2] >>> 0;
				x1 = _4[(base + 4) >> 2] >>> 0;
				x2 = _4[(base + 8) >> 2] >>> 0;
				size = x3 = _4[(base + 12) >> 2] >>> 0;
				base = slot = (x0 - v0) | 0;
				if ((slot >>> 0) > (x0 >>> 0)) {
					x1 = ((slot = x1) - 1) | 0;
					if ((x1 >>> 0) > (slot >>> 0)) {
						x2 = ((slot = x2) - 1) | 0;
						if ((x2 >>> 0) > (slot >>> 0)) x3 = (x3 - 1) | 0;
					}
				}
				base = base | (slot = (x1 - v1) | 0);
				if ((slot >>> 0) > (x1 >>> 0)) {
					x2 = ((slot = x2) - 1) | 0;
					if ((x2 >>> 0) > (slot >>> 0)) x3 = (x3 - 1) | 0;
				}
				base = base | (slot = (x2 - v2) | 0);
				if ((slot >>> 0) > (x2 >>> 0)) x3 = (x3 - 1) | 0;
				cmp = (x3 - v3) | 0;
				if (cmp | base) cmp = ((size ^ v3 ^ cmp) >>> 31) | (cmp & 0x80000000);
				else cmp = 2;
				return;
			case 5:
				f = +$f[base >> 2];
				if (f == f0) cmp = 2;
				else {
					if (f < f0) cmp = 0x80000001;
					else cmp = 0;
				}
				return;
			case 6:
				f = +$d[base >> 3];
				if (f == f0) cmp = 2;
				else {
					if (f < f0) cmp = 0x80000001;
					else cmp = 0;
				}
				return;
			case 7:
			default:
				err(E_NOSUPPORT);
		}
	}

	function convInt32() {
		var slot = 0;
		var base = 0;
		var size = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF; /*if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap|v0)|0;return;case 0x02:rParam=(rParam|v0)|0;return;case 0x03:rText=(rText|v0)|0;return;case 0x04:rEntity=(rEntity|v0)|0;return;case 0x05:rCode=(rCode|v0)|0;return;case 0x06:rCall=(rCall|v0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body|v0)|0;return;case 0x0A:spine=(spine|v0)|0;return;case 0x0B:free=(free|v0)|0;return;case 0x0C:seed=(seed|v0)|0;return;case 0x0D:rSig=(rSig|v0)|0;return;case 0x0E:rVirt=(rVirt|v0)|0;return;case 0x0F:op=(op|v0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=_1[base]|v0;return;case 1:_2[base>>1]=_2[base>>1]|v0;return;case 4:_4[(base+12)>>2]=_4[(base+12)>>2]|v3;_4[(base+8)>>2]=_4[(base+8)>>2]|v2;case 3:_4[(base+4)>>2]=_4[(base+4)>>2]|v1;case 2:_4[base>>2]=_4[base>>2]|v0;return;default:err(E_NOSUPPORT);}*/
	}

	function $_crash(addr) {
		addr = addr | 0;
		if (ring) err(E_PERM);
		dead = 1;
		_4[addr >> 2] = lastError;
		_4[(addr + 4) >> 2] = spine;
		_4[(addr + 8) >> 2] = body;
	}

	function $_cycle(tics /* 32768 */) {
		tics = tics | 0;
		var row = 0;
		var col = 0;
		if (dead) err(E_INVALID);
		for (; (tics | 0) > 0; tics = (tics - 1) | 0) {
			cute = _4[op >> 2] >>> 0;
			op = (op + 4) >>> 0;
			switch (cute & 0xff) {
				case 0x00:
					if (ring) err(E_PERM);
					dead = 1;
					err(E_HALT);
					break;
				case 0x01:
					getSrc();
					err(v0);
					break;
				case 0x02:
					getSrc();
					wait(v0 | 0);
					break;
				case 0x03:
					v0 = v1 = v2 = v3 = 0;
					getSrc();
					finger();
					fingerCnt = (fingerCnt + 1) | 0;
					setDst();
					break;
				case 0x04:
					fing0 = fing1 = fing2 = fing3 = fingerCnt = 0;
					break;
				case 0x05:
					enhance();
					setDst();
					break;
				case 0x06:
					v0 = 16;
					v1 = v2 = v3 = 0;
					setDst();
					break;
				case 0x07:
					if (ring) err(E_PERM);
					enhance();
					lock0 = v0;
					lock1 = v1;
					lock2 = v2;
					lock3 = v3;
					break;
				case 0x08:
					getSrc();
					cute = v0;
					if ((ring | 0) > (cute & 1)) {
						enhance();
						if (((lock0 | 0) != (v0 | 0)) | ((lock1 | 0) != (v1 | 0)) | ((lock2 | 0) != (v2 | 0)) | ((lock3 | 0) != (v3 | 0))) err(E_PERM);
					}
					ring = cute & 1;
					break;
				case 0x09:
					getSrc();
					setDst();
					break;
				case 0x0a:
					getSrc();
					compare();
					break;
				case 0x0b:
					getSrc();
					switch ((cute >> 18) & 0x3f) {
						case 0:
							op = (rCode + v0) >>> 0;
							break;
						case 1:
							if (cmp & 2) op = (rCode + v0) >>> 0;
							break;
						case 2:
							if (cmp & 0x80000000) op = (rCode + v0) >>> 0;
							break;
						case 3:
							if (cmp & 0x80000002) op = (rCode + v0) >>> 0;
							break;
						case 4:
							if ((cmp & 0x80000002) == 0) op = (rCode + v0) >>> 0;
							break;
						case 5:
							if ((cmp & 0x80000000) == 0) op = (rCode + v0) >>> 0;
							break;
						case 6:
							if ((cmp & 2) == 0) op = (rCode + v0) >>> 0;
							break;
						case 7:
							if (cmp & 1) op = (rCode + v0) >>> 0;
							break;
						case 8:
							if (cmp & 3) op = (rCode + v0) >>> 0;
							break;
						case 9:
							if ((cmp & 3) == 0) op = (rCode + v0) >>> 0;
							break;
						case 10:
							if ((cmp & 1) == 0) op = (rCode + v0) >>> 0;
							break;
						default:
							err(E_INVALID);
					}
					break;
				case 0x0c:
					err(E_NOSUPPORT);
				case 0x0d:
					getSrc();
					addition();
					break;
				case 0x0e:
					getSrc();
					subtraction();
					break;
				case 0x0f:
					getSrc();
					bitNOT();
					break;
				case 0x10:
					getSrc();
					bitXOR();
					break;
				case 0x11:
					getSrc();
					bitAND();
					break;
				case 0x12:
					getSrc();
					bitOR();
					break;
				case 0x13:
					bitSHL();
					break;
				case 0x14:
					bitSHRX();
					break;
				case 0x15:
					bitSHR();
					break;
				case 0x16:
					bitSpinL();
					break;
				case 0x17:
					bitSpinR();
					break;
				case 0x18:
					getSrc();
					signExtend();
					break;
				case 0x19:
					getSrc();
					negate();
					break;
				case 0x1a:
					getSrc();
					multiplication();
					break;
				case 0x1b:
					getSrc();
					division();
					break;
				case 0x1c:
					getSrc();
					modulous();
					break;
				case 0x1d:
					getSrc();
					divisionUnsigned();
					break;
				case 0x1e:
					getSrc();
					modulousUnsigned();
					break;
				case 0x1f:
					getSrc();
					visit();
					break;
				case 0x20:
					op = _4[(rCall + ret) >> 2] >>> 0;
					ret = (ret - 4) >>> 0;
					rParam = _4[(rCall + ret) >> 2] >>> 0;
					ret = (ret - 4) >>> 0;
					break;
				case 0x23:
					getSrc();
					convInt32();
					break;
				case 0x21:
				case 0x22:
				case 0x24:
				case 0x25:
				case 0x26:
				case 0x27:
				case 0x28:
					logv(cute & 0xff);
					err(E_NOSUPPORT);
				case 0x29:
					f0 = +time();
					setDst();
					break;
				case 0x2a:
					f0 = +time();
					v0 = ~~(f0 - delta);
					delta = f0;
					v1 = v2 = v3 = 0;
					setDst();
					break;
				default:
					err(E_INVALID);
			}
		}
		return 0;
	}

	function division() {
		var slot = 0;
		var base = 0;
		var size = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = ((rHeap | 0) / (v0 | 0)) | 0;
							return;
						case 0x02:
							rParam = ((rParam | 0) / (v0 | 0)) | 0;
							return;
						case 0x03:
							rText = ((rText | 0) / (v0 | 0)) | 0;
							return;
						case 0x04:
							rEntity = ((rEntity | 0) / (v0 | 0)) | 0;
							return;
						case 0x05:
							rCode = ((rCode | 0) / (v0 | 0)) | 0;
							return;
						case 0x06:
							rCall = ((rCall | 0) / (v0 | 0)) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = ((body | 0) / (v0 | 0)) | 0;
							return;
						case 0x0A:
							spine = ((spine | 0) / (v0 | 0)) | 0;
							return;
						case 0x0B:
							free = ((free | 0) / (v0 | 0)) | 0;
							return;
						case 0x0C:
							seed = ((seed | 0) / (v0 | 0)) | 0;
							return;
						case 0x0D:
							rSig = ((rSig | 0) / (v0 | 0)) | 0;
							return;
						case 0x0E:
							rVirt = ((rVirt | 0) / (v0 | 0)) | 0;
							return;
						case 0x0F:
							op = ((op | 0) / (v0 | 0)) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = ((_1[base] << 24) >> 24) / ((v0 << 24) >> 24);
				return;
			case 1:
				_2[base >> 1] = ((_2[base >> 1] << 16) >> 16) / ((v0 << 16) >> 16);
				return;
			case 2:
				_4[base >> 2] = ((_4[base >> 2] | 0) / (v0 | 0)) | 0;
				return;
			case 3:
			case 4:
				err(E_NOSUPPORT);
			case 5:
				$f[base >> 2] = $f[base >> 2] / fround(f0);
				return;
			case 6:
				$d[base >> 3] = $d[base >> 3] / f0;
				return;
			case 7:
			default:
				err(E_NOSUPPORT);
		}
	}

	function divisionUnsigned() {
		var slot = 0;
		var base = 0;
		var size = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = ((rHeap >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x02:
							rParam = ((rParam >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x03:
							rText = ((rText >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x04:
							rEntity = ((rEntity >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x05:
							rCode = ((rCode >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x06:
							rCall = ((rCall >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = ((body >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x0A:
							spine = ((spine >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x0B:
							free = ((free >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x0C:
							seed = ((seed >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x0D:
							rSig = ((rSig >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x0E:
							rVirt = ((rVirt >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						case 0x0F:
							op = ((op >>> 0) / (v0 >>> 0)) >>> 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = (_1[base] >>> 0) / (v0 >>> 0);
				return;
			case 1:
				_2[base >> 1] = (_2[base >> 1] >>> 0) / (v0 >>> 0);
				return;
			case 2:
				_4[base >> 2] = (_4[base >> 2] >>> 0) / (v0 >>> 0);
				return;
			case 3:
			case 4:
				err(E_NOSUPPORT);
			case 5:
			case 6:
			case 7:
				err(E_NOSUPPORT);
			default:
				err(E_NOSUPPORT);
		}
	}

	function enhance() {
		var e0 = 0;
		var e1 = 0;
		var e2 = 0;
		var e3 = 0;
		var fc = 0;
		e0 = fing0;
		e1 = fing1;
		e2 = fing2;
		e3 = fing3;
		v1 = v2 = v3 = 0;
		v0 = fingerCnt;
		for (fc = 64;
			(fc | 0) > 0; fc = (fc - 1) | 0) finger();
		v0 = fing0;
		v1 = fing1;
		v2 = fing2;
		v3 = fing3;
		fing0 = e0;
		fing1 = e1;
		fing2 = e2;
		fing3 = e3;
	}

	function err(e) {
		e = e | 0;
		lastError = e;
		dead = 1;
		error(e | 0);
	}

	function finger() {
		var r = 0;
		r = v0;
		v0 = (v0 >>> 7) | (v1 << 25);
		v1 = (v1 >>> 7) | (v2 << 25);
		v2 = (v2 >>> 7) | (v3 << 25);
		v3 = (v3 >>> 7) | (r << 25);
		fing0 = ((fing0 & 0x6487ED51) + fing2 + (v0 ^ 0x10B4611A)) | 0;
		fing1 = ((fing1 ^ 0x62633145) + fing3 + (v1 ^ 0xC06E0E68)) | 0;
		fing2 = ((fing2 ^ 0x94812704) + fing0 + (v2 ^ 0x4533E63A)) | 0;
		fing3 = ((fing3 & 0x0105DF53) + fing1 + (v3 ^ 0x1D89CD91)) | 0;
		v0 = (fing1 + fing3) | 0;
		v1 = (fing2 + fing0) | 0;
		v2 = (fing3 + fing2) | 0;
		v3 = (fing0 + fing1) | 0;
		r = v0;
		v0 = (v0 >>> 15) | (v1 << 17);
		v1 = (v1 >>> 15) | (v2 << 17);
		v2 = (v2 >>> 15) | (v3 << 17);
		v3 = (v3 >>> 15) | (r << 17);
		fing0 = ((fing0 & 0x28A5043C) + fing2 + (v0 ^ 0xC71A026E)) | 0;
		fing1 = ((fing1 ^ 0xF7CA8CD9) + fing3 + (v1 ^ 0xE69D218D)) | 0;
		fing2 = ((fing2 ^ 0x98158536) + fing0 + (v2 ^ 0xF92F8A1B)) | 0;
		fing3 = ((fing3 & 0xA7F09AB6) + fing1 + (v3 ^ 0xB6A8E122)) | 0;
		v0 = (fing1 + fing3) | 0;
		v1 = (fing2 + fing0) | 0;
		v2 = (fing3 + fing2) | 0;
		v3 = (fing0 + fing1) | 0;
		r = v0;
		v0 = (v0 >>> 21) | (v1 << 11);
		v1 = (v1 >>> 21) | (v2 << 11);
		v2 = (v2 >>> 21) | (v3 << 11);
		v3 = (v3 >>> 21) | (r << 11);
		fing0 = ((fing0 & 0xF242DABB) + fing2 + (v0 ^ 0x312F3F63)) | 0;
		fing1 = ((fing1 ^ 0x7A262174) + fing3 + (v1 ^ 0xD31BF6B5)) | 0;
		fing2 = ((fing2 ^ 0x85FFAE5B) + fing0 + (v2 ^ 0x7A035BF6)) | 0;
		fing3 = ((fing3 & 0xF71C35FD) + fing1 + (v3 ^ 0xAD44CFD2)) | 0;
		v0 = (fing1 + fing3) | 0;
		v1 = (fing2 + fing0) | 0;
		v2 = (fing3 + fing2) | 0;
		v3 = (fing0 + fing1) | 0;
	}

	function getSrc() {
		v0 = (cute >>> 24) | 0;
		if (cute & 0x8000) {
			switch ((cute >>> 8) & 7) {
				case 0:
					return;
				case 1:
					v0 = _2[op >> 1] | 0;
					op = (op + 4) | 0;
					return;
				case 2:
					if (v0) {
						if (ring) err(E_PERM);
						switch (v0 | 0) {
							case 0x01:
								v0 = rHeap;
								return;
							case 0x02:
								v0 = rParam;
								return;
							case 0x03:
								v0 = rText;
								return;
							case 0x04:
								v0 = rEntity;
								return;
							case 0x05:
								v0 = rCode;
								return;
							case 0x06:
								v0 = rCall;
								return;
							case 0x07:
								v0 = (ring << 2) | cmp;
								return;
							case 0x08:
								err(E_INVALID);
							case 0x09:
								v0 = body;
								return;
							case 0x0A:
								v0 = spine;
								return;
							case 0x0B:
								v0 = free;
								return;
							case 0x0C:
								v0 = seed;
								return;
							case 0x0D:
								v0 = rSig;
								return;
							case 0x0E:
								v0 = rVirt;
								return;
							case 0x0F:
								v0 = (op - rCode) | 0;
								return;
							default:
						}
						err(E_INVALID);
					}
					v0 = _4[op >> 2] | 0;
					op = (op + 4) | 0;
					return;
				case 7:
				case 4:
					v0 = _4[op >> 2] | 0;
					v1 = _4[(op + 4) >> 2] | 0;
					v2 = _4[(op + 8) >> 2] | 0;
					v3 = _4[(op + 12) >> 2] | 0;
					op = (op + 16) | 0;
					return;
				case 3:
					v0 = _4[op >> 2] | 0;
					v1 = _4[(op + 4) >> 2] | 0;
					op = (op + 8) | 0;
					return;
				case 5:
					f0 = +$f[op >> 2];
					op = (op + 4) | 0;
					return;
				case 6:
					f0 = +$d[(op = (op + 7) | 0) >> 3];
					op = ((op & 0xfffffff8) + 8) | 0;
					return;
				default:
			}
		}
		if ((cute & 0x0800) == 0) {
			switch ((cute >> 12) & 7) {
				case 0:
					v0 = (rParam + v0) >>> 0;
					break;
				case 1:
					v0 = ((_4[(rParam + v0) >> 2] >>> 0) + rHeap) >>> 0;
					break;
				case 2:
					v0 = ((_4[(rParam + v0) >> 2] >>> 0) + rParam) >>> 0;
					break;
				case 3:
					v0 = ((_4[(rParam + v0) >> 2] >>> 0) + rText) >>> 0;
					break;
				case 4:
					v0 = ((_4[(rParam + v0) >> 2] >>> 0) + rEntity) >>> 0;
					break;
				case 5:
					v0 = ((_4[(rParam + v0) >> 2] >>> 0) + rCode) >>> 0;
					break;
				case 6:
					v0 = ((_4[(rParam + v0) >> 2] >>> 0) + rCall) >>> 0;
					break;
				case 7:
					v0 = _4[(rParam + v0) >> 2] >>> 0;
					break;
			}
		} else {
			v0 = (rParam + v0) >>> 0;
		}
		switch ((cute >>> 8) & 7) {
			case 4:
			case 7:
				v3 = _4[(v0 + 12) >> 2] >>> 0;
				v2 = _4[(v0 + 8) >> 2] >>> 0;
			case 3:
				v1 = _4[(v0 + 4) >> 2] >>> 0;
			case 2:
				v0 = _4[v0 >> 2] >>> 0;
				break;
			case 1:
				v0 = _2[v0 >> 1] >>> 0;
				break;
			case 0:
				v0 = _1[v0] >>> 0;
				break;
			case 5:
				f0 = +$f[v0 >> 2];
				break;
			case 6:
				f0 = +$d[v0 >> 3];
			default:
		}
	}

	function $_getRing() {
		return ring | 0;
	}

	function grow(max) {
		max = max | 0;
		var pos = 0;
		var mem = 0;
		var next = 0;
		if (((spine + 0x1fff) | 0) > (max | 0) | ((spine + (max >>> 10)) | 0) > (max | 0)) {
			body = max;
			err(E_NOMEM);
		}
		max = (max & 0xffffe000);
		next = free;
		for (pos = max;
			(pos | 0) > (body | 0); pos = (pos - 0x2000) | 0) {
			mem = pos >>> 10;
			_4[(spine + mem) >> 2] = 0x0e02;
			_4[(spine + mem + 4) >> 2] = 0x0c03;
			next = mem;
		}
		free = mem;
		body = max;
	}

	function halt() {
		dead = 1;
		err(E_HALT);
	}

	function $_halt() {
		dead = 1;
		err(E_HALT);
	}

	function $_init(max, pos, arg, k0, k1, k2, k3) {
		max = max | 0;
		pos = pos | 0;
		arg = arg | 0;
		k0 = k0 | 0;
		k1 = k1 | 0;
		k2 = k2 | 0;
		k3 = k3 | 0;
		if (ini) err(E_INVALID);
		spine = 0;
		body = max;
		if ((lock0 = k0) | (lock1 = k1) | (lock2 = k2) | (lock3 = k3)) ring = 1;
		else ring = 0;
		rParam = arg;
		rCode = pos;
		op = rCode;
		ret = 0;
		ini = 1;
		dead = 0;
		born = +time();
		return 0;
	}

	function modulous() {
		var slot = 0;
		var base = 0;
		var size = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = ((rHeap | 0) % (v0 | 0)) | 0;
							return;
						case 0x02:
							rParam = ((rParam | 0) % (v0 | 0)) | 0;
							return;
						case 0x03:
							rText = ((rText | 0) % (v0 | 0)) | 0;
							return;
						case 0x04:
							rEntity = ((rEntity | 0) % (v0 | 0)) | 0;
							return;
						case 0x05:
							rCode = ((rCode | 0) % (v0 | 0)) | 0;
							return;
						case 0x06:
							rCall = ((rCall | 0) % (v0 | 0)) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = ((body | 0) % (v0 | 0)) | 0;
							return;
						case 0x0A:
							spine = ((spine | 0) % (v0 | 0)) | 0;
							return;
						case 0x0B:
							free = ((free | 0) % (v0 | 0)) | 0;
							return;
						case 0x0C:
							seed = ((seed | 0) % (v0 | 0)) | 0;
							return;
						case 0x0D:
							rSig = ((rSig | 0) % (v0 | 0)) | 0;
							return;
						case 0x0E:
							rVirt = ((rVirt | 0) % (v0 | 0)) | 0;
							return;
						case 0x0F:
							op = ((op | 0) % (v0 | 0)) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = ((_1[base] << 24) >> 24) % ((v0 << 24) >> 24);
				return;
			case 1:
				_2[base >> 1] = ((_2[base >> 1] << 16) >> 16) % ((v0 << 16) >> 16);
				return;
			case 2:
				_4[base >> 2] = ((_4[base >> 2] | 0) % (v0 | 0)) | 0;
				return;
			case 3:
			case 4:
				err(E_NOSUPPORT);
			case 5:
				$f[base >> 2] = fround((+$f[base >> 2]) % f0);
				return;
			case 6:
				$d[base >> 3] = $d[base >> 3] % f0;
				return;
			case 7:
			default:
				err(E_NOSUPPORT);
		}
	}

	function modulousUnsigned() {
		var slot = 0;
		var base = 0;
		var size = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = ((rHeap >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x02:
							rParam = ((rParam >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x03:
							rText = ((rText >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x04:
							rEntity = ((rEntity >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x05:
							rCode = ((rCode >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x06:
							rCall = ((rCall >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = ((body >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x0A:
							spine = ((spine >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x0B:
							free = ((free >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x0C:
							seed = ((seed >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x0D:
							rSig = ((rSig >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x0E:
							rVirt = ((rVirt >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						case 0x0F:
							op = ((op >>> 0) % (v0 >>> 0)) >>> 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = (_1[base] >>> 0) % (v0 >>> 0);
				return;
			case 1:
				_2[base >> 1] = (_2[base >> 1] >>> 0) % (v0 >>> 0);
				return;
			case 2:
				_4[base >> 2] = (_4[base >> 2] >>> 0) % (v0 >>> 0);
				return;
			case 3:
			case 4:
				err(E_NOSUPPORT);
			case 5:
			case 6:
			case 7:
				err(E_NOSUPPORT);
			default:
				err(E_NOSUPPORT);
		}
	}

	function multiplication() {
		var slot = 0;
		var base = 0;
		var size = 0;
		var f = 0.0;
		var v4 = 0;
		var v5 = 0;
		var v6 = 0;
		var v7 = 0;
		var x0 = 0;
		var x1 = 0;
		var x2 = 0;
		var x3 = 0;
		var x4 = 0;
		var x5 = 0;
		var x6 = 0;
		var x7 = 0;
		var r0 = 0;
		var r1 = 0;
		var r2 = 0;
		var r3 = 0;
		var r4 = 0;
		var r5 = 0;
		var r6 = 0;
		var r7 = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = imul(rHeap | 0, v0 | 0) | 0;
							return;
						case 0x02:
							rParam = imul(rParam | 0, v0 | 0) | 0;
							return;
						case 0x03:
							rText = imul(rText | 0, v0 | 0) | 0;
							return;
						case 0x04:
							rEntity = imul(rEntity | 0, v0 | 0) | 0;
							return;
						case 0x05:
							rCode = imul(rCode | 0, v0 | 0) | 0;
							return;
						case 0x06:
							rCall = imul(rCall | 0, v0 | 0) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = imul(body | 0, v0 | 0) | 0;
							return;
						case 0x0A:
							spine = imul(spine | 0, v0 | 0) | 0;
							return;
						case 0x0B:
							free = imul(free | 0, v0 | 0) | 0;
							return;
						case 0x0C:
							seed = imul(seed | 0, v0 | 0) | 0;
							return;
						case 0x0D:
							rSig = imul(rSig | 0, v0 | 0) | 0;
							return;
						case 0x0E:
							rVirt = imul(rVirt | 0, v0 | 0) | 0;
							return;
						case 0x0F:
							op = imul(op | 0, v0 | 0) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = imul(_1[base] | 0, v0 | 0) | 0;
				return;
			case 1:
				_2[base >> 1] = imul(_2[base >> 1] | 0, v0 | 0) | 0;
				return;
			case 2:
				_4[base >> 2] = imul(_4[base >> 2] | 0, v0 | 0) | 0;
				return;
			case 3:
				v3 = (v1 >>> 16);
				v2 = (v1 & 0xffff);
				v1 = (v0 >>> 16);
				v0 = (v0 & 0xffff);
				x0 = (x1 = _4[base >> 2] >>> 0) & 0xffff;
				x1 = x1 >>> 16;
				x2 = (x3 = _4[(base + 4) >> 2] >>> 0) & 0xffff;
				x3 = x3 >>> 16;
				r0 = imul(v0 | 0, x0 | 0) | 0;
				slot = r0 & 0xffff;
				size = r0 >>> 16;
				r0 = imul(v1 | 0, x0 | 0) | 0;
				r1 = imul(v0 | 0, x1 | 0) | 0;
				size = ((r0 & 0xffff) + (r1 & 0xffff) + size) >>> 0;
				_4[base >> 2] = (size << 16) | slot;
				size = ((size >>> 16) + (r0 >>> 16) + (r1 >>> 16)) >>> 0;
				r0 = imul(v2 | 0, x0 | 0) | 0;
				r1 = imul(v1 | 0, x1 | 0) | 0;
				r2 = imul(v0 | 0, x2 | 0) | 0;
				size = ((r0 & 0xffff) + (r1 & 0xffff) + (r2 & 0xffff) + size) >>> 0;
				slot = size & 0xffff;
				size = ((size >>> 16) + (r0 >>> 16) + (r1 >>> 16) + (r2 >>> 16)) >>> 0;
				r0 = imul(v3 | 0, x0 | 0) | 0;
				r1 = imul(v2 | 0, x1 | 0) | 0;
				r2 = imul(v1 | 0, x2 | 0) | 0;
				r3 = imul(v0 | 0, x3 | 0) | 0;
				size = ((r0 & 0xffff) + (r1 & 0xffff) + (r2 & 0xffff) + (r3 & 0xffff) + size) >>> 0;
				_4[(base + 4) >> 2] = (size << 16) | slot;
				return;
			case 4:
				v7 = v3 >>> 16;
				v6 = v3 & 0xffff;
				v5 = v2 >>> 16;
				v4 = v2 & 0xffff;
				v3 = v1 >>> 16;
				v2 = v1 & 0xffff;
				v1 = v0 >>> 16;
				v0 = v0 & 0xffff;
				x0 = (x1 = _4[base >> 2] | 0) & 0xffff;
				x1 = x1 >>> 16;
				x2 = (x3 = _4[(base + 4) >> 2] | 0) & 0xffff;
				x3 = x3 >>> 16;
				x4 = (x5 = _4[(base + 8) >> 2] | 0) & 0xffff;
				x5 = x5 >>> 16;
				x6 = (x7 = _4[(base + 12) >> 2] | 0) & 0xffff;
				x7 = x7 >>> 16;
				r0 = imul(v0 | 0, x0 | 0) | 0;
				slot = r0 & 0xffff;
				size = r0 >>> 16;
				r0 = imul(v1 | 0, x0 | 0) | 0;
				r1 = imul(v0 | 0, x1 | 0) | 0;
				size = ((r0 & 0xffff) + (r1 & 0xffff) + size) >>> 0;
				_4[base >> 2] = (size << 16) | slot;
				size = ((size >>> 16) + (r0 >>> 16) + (r1 >>> 16)) >>> 0;
				r0 = imul(v2 | 0, x0 | 0) | 0;
				r1 = imul(v1 | 0, x1 | 0) | 0;
				r2 = imul(v0 | 0, x2 | 0) | 0;
				size = ((r0 & 0xffff) + (r1 & 0xffff) + (r2 & 0xffff) + size) >>> 0;
				slot = size & 0xffff;
				size = ((size >>> 16) + (r0 >>> 16) + (r1 >>> 16) + (r2 >>> 16)) >>> 0;
				r0 = imul(v3 | 0, x0 | 0) | 0;
				r1 = imul(v2 | 0, x1 | 0) | 0;
				r2 = imul(v1 | 0, x2 | 0) | 0;
				r3 = imul(v0 | 0, x3 | 0) | 0;
				size = ((r0 & 0xffff) + (r1 & 0xffff) + (r2 & 0xffff) + (r3 & 0xffff) + size) >>> 0;
				_4[(base + 4) >> 2] = (size << 16) | slot;
				size = ((size >>> 16) + (r0 >>> 16) + (r1 >>> 16) + (r2 >>> 16) + (r3 >>> 16)) >>> 0;
				r0 = imul(v4 | 0, x0 | 0) | 0;
				r1 = imul(v3 | 0, x1 | 0) | 0;
				r2 = imul(v2 | 0, x2 | 0) | 0;
				r3 = imul(v1 | 0, x3 | 0) | 0;
				r4 = imul(v0 | 0, x4 | 0) | 0;
				size = ((r0 & 0xffff) + (r1 & 0xffff) + (r2 & 0xffff) + (r3 & 0xffff) + (r4 & 0xffff) + size) >>> 0;
				slot = size & 0xffff;
				size = ((size >>> 16) + (r0 >>> 16) + (r1 >>> 16) + (r2 >>> 16) + (r3 >>> 16) + (r4 >>> 16)) >>> 0;
				r0 = imul(v5 | 0, x0 | 0) | 0;
				r1 = imul(v4 | 0, x1 | 0) | 0;
				r2 = imul(v3 | 0, x2 | 0) | 0;
				r3 = imul(v2 | 0, x3 | 0) | 0;
				r4 = imul(v1 | 0, x4 | 0) | 0;
				r5 = imul(v0 | 0, x5 | 0) | 0;
				size = ((r0 & 0xffff) + (r1 & 0xffff) + (r2 & 0xffff) + (r3 & 0xffff) + (r4 & 0xffff) + (r5 & 0xffff) + size) >>> 0;
				_4[(base + 8) >> 2] = (size << 16) | slot;
				size = ((size >>> 16) + (r0 >>> 16) + (r1 >>> 16) + (r2 >>> 16) + (r3 >>> 16) + (r4 >>> 16) + (r5 >>> 16)) >>> 0;
				r0 = imul(v6 | 0, x0 | 0) | 0;
				r1 = imul(v5 | 0, x1 | 0) | 0;
				r2 = imul(v4 | 0, x2 | 0) | 0;
				r3 = imul(v3 | 0, x3 | 0) | 0;
				r4 = imul(v2 | 0, x4 | 0) | 0;
				r5 = imul(v1 | 0, x5 | 0) | 0;
				r6 = imul(v0 | 0, x6 | 0) | 0;
				size = ((r0 & 0xffff) + (r1 & 0xffff) + (r2 & 0xffff) + (r3 & 0xffff) + (r4 & 0xffff) + (r5 & 0xffff) + (r6 & 0xffff) + size) >>> 0;
				slot = size & 0xffff;
				size = ((size >>> 16) + (r0 >>> 16) + (r1 >>> 16) + (r2 >>> 16) + (r3 >>> 16) + (r4 >>> 16) + (r5 >>> 16) + (r6 >>> 16)) >>> 0;
				r0 = imul(v7 | 0, x0 | 0) | 0;
				r1 = imul(v6 | 0, x1 | 0) | 0;
				r2 = imul(v5 | 0, x2 | 0) | 0;
				r3 = imul(v4 | 0, x3 | 0) | 0;
				r4 = imul(v3 | 0, x4 | 0) | 0;
				r5 = imul(v2 | 0, x5 | 0) | 0;
				r6 = imul(v1 | 0, x6 | 0) | 0;
				r7 = imul(v0 | 0, x7 | 0) | 0;
				size = ((r0 & 0xffff) + (r1 & 0xffff) + (r2 & 0xffff) + (r3 & 0xffff) + (r4 & 0xffff) + (r5 & 0xffff) + (r6 & 0xffff) + (r7 & 0xffff) + size) >>> 0;
				_4[(base + 12) >> 2] = (size << 16) | slot;
				return;
			case 5:
				$f[base >> 2] = fround(+$f[base >> 2] * f0);
				return;
			case 6:
				$d[base >> 3] = $d[base >> 3] * f0;
				return;
			case 7:
			default:
				err(E_NOSUPPORT);
		}
	}

	function negate() {
		var slot = 0;
		var base = 0;
		var size = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (-v0) | 0;
							return;
						case 0x02:
							rParam = (-v0) | 0;
							return;
						case 0x03:
							rText = (-v0) | 0;
							return;
						case 0x04:
							rEntity = (-v0) | 0;
							return;
						case 0x05:
							rCode = (-v0) | 0;
							return;
						case 0x06:
							rCall = (-v0) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (-v0) | 0;
							return;
						case 0x0A:
							spine = (-v0) | 0;
							return;
						case 0x0B:
							free = (-v0) | 0;
							return;
						case 0x0C:
							seed = (-v0) | 0;
							return;
						case 0x0D:
							rSig = (-v0) | 0;
							return;
						case 0x0E:
							rVirt = (-v0) | 0;
							return;
						case 0x0F:
							op = (-v0) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = (-v0) | 0;
				return;
			case 1:
				_2[base >> 1] = (-v0) | 0;
				return;
			case 2:
				_4[base >> 2] = (-v0) | 0;
				return;
			case 3:
				_4[base >> 2] = slot = ((size = (~v0) | 0) + 1) | 0;
				base = (base + 4) | 0;
				if ((slot >>> 0) < (size >>> 0)) _4[base >> 2] = ((~v1) + 1) | 0;
				else _4[base >> 2] = ~v1;
				return;
			case 4:
				_4[base >> 2] = slot = ((size = (~v0) | 0) + 1) | 0;
				if ((slot >>> 0) < (size >>> 0)) {
					_4[(base + 4) >> 2] = slot = ((size = (~v1) | 0) + 1) | 0;
					if ((slot >>> 0) < (size >>> 0)) {
						_4[(base + 8) >> 2] = slot = ((size = (~v2) | 0) + 1) | 0;
						if ((slot >>> 0) < (size >>> 0)) _4[(base + 12) >> 2] = ((~v3) + 1) | 0;
						else _4[(base + 12) >> 2] = ~v3;
					} else {
						_4[(base + 8) >> 2] = ~v2;
						_4[(base + 12) >> 2] = ~v3;
					}
				} else {
					_4[(base + 4) >> 2] = ~v1;
					_4[(base + 8) >> 2] = ~v2;
					_4[(base + 12) >> 2] = ~v3;
				}
				return;
			case 5:
				$f[base >> 2] = fround(-f0);
				return;
			case 6:
				$d[base >> 3] = -f0;
				return;
			case 7:
			default:
				err(E_NOSUPPORT);
		}
	}

	function notRoot() {
		if (dead) return 1;
		if (ring) err(E_PERM);
		return 0;
	}

	function $_reset() {
		if (ring) err(E_PERM);
	}

	function setDst() {
		var slot = 0;
		var base = 0;
		var size = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x00:
							return;
						case 0x01:
							rHeap = v0;
							return;
						case 0x02:
							rParam = v0;
							return;
						case 0x03:
							rText = v0;
							return;
						case 0x04:
							rEntity = v0;
							return;
						case 0x05:
							rCode = v0;
							return;
						case 0x06:
							rCall = v0;
							return;
						case 0x07:
							ring = (v0 >>> 2) & 1;
							cmp = 0x80000003 & v0;
							return;
						case 0x08:
							err(E_INVALID);
							return;
						case 0x09:
							body = v0;
							return;
						case 0x0A:
							spine = v0;
							return;
						case 0x0B:
							free = v0;
							return;
						case 0x0C:
							seed = v0;
							return;
						case 0x0D:
							rSig = v0;
							return;
						case 0x0E:
							rVirt = v0;
							return;
						case 0x0F:
							op = (v0 + rCode) | 0;
							return;
						default:
					}
					err(E_INVALID);
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else {
			base = (rParam + slot) >>> 0;
		}
		switch (size | 0) {
			case 0:
				_1[base] = v0 >>> 0;
				return;
			case 1:
				_2[base >> 1] = v0 >>> 0;
				return;
			case 4:
			case 7:
				_4[(base + 12) >> 2] = v3 >>> 0;
				_4[(base + 8) >> 2] = v2 >>> 0;
			case 3:
				_4[(base + 4) >> 2] = v1 >>> 0;
			case 2:
				_4[base >> 2] = v0 >>> 0;
				return;
			case 5:
				$f[base >> 2] = f0;
				return;
			case 6:
				$d[base >> 3] = f0;
				return;
			default:
		}
	}

	function $_setRing(which) {
		which = which | 0;
		if (dead) err(E_INVALID);
		if ((ring | 0) > (which & 1)) {
			enhance();
			if (((lock0 | 0) != (v0 | 0)) | ((lock1 | 0) != (v1 | 0)) | ((lock2 | 0) != (v2 | 0)) | ((lock3 | 0) != (v3 | 0))) err(E_PERM);
		}
		ring = which & 1;
	}

	function signExtend() {
		var slot = 0;
		var base = 0;
		var size = 0;
		var x0 = 0;
		var x1 = 0;
		var x2 = 0;
		var x3 = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (v0 << 16) >> 16;
							return;
						case 0x02:
							rParam = (v0 << 16) >> 16;
							return;
						case 0x03:
							rText = (v0 << 16) >> 16;
							return;
						case 0x04:
							rEntity = (v0 << 16) >> 16;
							return;
						case 0x05:
							rCode = (v0 << 16) >> 16;
							return;
						case 0x06:
							rCall = (v0 << 16) >> 16;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (v0 << 16) >> 16;
							return;
						case 0x0A:
							spine = (v0 << 16) >> 16;
							return;
						case 0x0B:
							free = (v0 << 16) >> 16;
							return;
						case 0x0C:
							seed = (v0 << 16) >> 16;
							return;
						case 0x0D:
							rSig = (v0 << 16) >> 16;
							return;
						case 0x0E:
							rVirt = (v0 << 16) >> 16;
							return;
						case 0x0F:
							op = (v0 << 16) >> 16;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = (v0 << 28) >> 28;
				return;
			case 1:
				_2[base >> 1] = (v0 << 24) >> 24;
				return;
			case 2:
				_4[base >> 2] = (v0 << 16) >> 16;
				return;
			case 3:
				_4[base >> 2] = v0;
				_4[(base + 4) >> 2] = v0 >> 31;
				return;
			case 4:
				_4[base >> 2] = v0;
				_4[(base + 4) >> 2] = v1;
				_4[(base + 8) >> 2] = _4[(base + 12) >> 2] = v1 >> 31;
				return;
			default:
				err(E_NOSUPPORT);
		}
	}

	function subtraction() {
		var slot = 0;
		var base = 0;
		var size = 0;
		var f = 0.0;
		var x0 = 0;
		var x1 = 0;
		var x2 = 0;
		var x3 = 0;
		size = (cute >>> 8) & 7;
		slot = (cute >>> 16) & 0xFF;
		if (cute & 0x0800) {
			switch ((base = (cute >> 12) & 7)) {
				case 0:
					if (ring) err(E_PERM);
					switch (slot | 0) {
						case 0x01:
							rHeap = (rHeap - v0) | 0;
							return;
						case 0x02:
							rParam = (rParam - v0) | 0;
							return;
						case 0x03:
							rText = (rText - v0) | 0;
							return;
						case 0x04:
							rEntity = (rEntity - v0) | 0;
							return;
						case 0x05:
							rCode = (rCode - v0) | 0;
							return;
						case 0x06:
							rCall = (rCall - v0) | 0;
							return;
						case 0x07:
							err(E_INVALID);
						case 0x08:
							err(E_INVALID);
						case 0x09:
							body = (body - v0) | 0;
							return;
						case 0x0A:
							spine = (spine - v0) | 0;
							return;
						case 0x0B:
							free = (free - v0) | 0;
							return;
						case 0x0C:
							seed = (seed - v0) | 0;
							return;
						case 0x0D:
							rSig = (rSig - v0) | 0;
							return;
						case 0x0E:
							rVirt = (rVirt - v0) | 0;
							return;
						case 0x0F:
							op = (op - v0) | 0;
							return;
						default:
							err(E_INVALID);
					}
				case 1:
					base = rHeap;
					break;
				case 2:
					base = rParam;
					break;
				case 3:
					base = rText;
					break;
				case 4:
					base = rEntity;
					break;
				case 5:
					base = rCode;
					break;
				case 6:
					base = rCall;
					break;
				case 7:
					base = 0;
			}
			base = (base + (_4[(rParam + slot) >> 2] >>> 0)) >>> 0;
		} else base = (rParam + slot) | 0;
		switch (size | 0) {
			case 0:
				_1[base] = (_1[base] >>> 0) - v0;
				return;
			case 1:
				_2[base >> 1] = (_2[base >> 1] >>> 0) - v0;
				return;
			case 2:
				_4[base >> 2] = (_4[base >> 2] >>> 0) - v0;
				return;
			case 3:
				slot = (_4[base >> 2] = (size = _4[base >> 2] | 0) - v0) | 0;
				base = (base + 4) | 0;
				if ((slot >>> 0) > (size >>> 0)) _4[base >> 2] = (_4[base >> 2] | 0) - v1 - 1;
				else _4[base >> 2] = (_4[base >> 2] | 0) - v1;
				return;
			case 4:
				x0 = _4[base >> 2] >>> 0;
				x1 = _4[(base + 4) >> 2] >>> 0;
				x2 = _4[(base + 8) >> 2] >>> 0;
				x3 = _4[(base + 12) >> 2] >>> 0;
				_4[base >> 2] = slot = (x0 - v0) | 0;
				if ((slot >>> 0) > (x0 >>> 0)) {
					x1 = ((slot = x1) - 1) | 0;
					if ((x1 >>> 0) > (slot >>> 0)) {
						x2 = ((slot = x2) - 1) | 0;
						if ((x2 >>> 0) > (slot >>> 0)) x3 = (x3 - 1) | 0;
					}
				}
				_4[(base + 4) >> 2] = slot = (x1 - v1) | 0;
				if ((slot >>> 0) > (x1 >>> 0)) {
					x2 = ((slot = x2) - 1) | 0;
					if ((x2 >>> 0) > (slot >>> 0)) x3 = (x3 - 1) | 0;
				}
				_4[(base + 8) >> 2] = slot = (x2 - v2) | 0;
				if ((slot >>> 0) > (x2 >>> 0)) x3 = (x3 - 1) | 0;
				_4[(base + 12) >> 2] = (x3 - v3) | 0;
				return;
			case 5:
				$f[base >> 2] = $f[base >> 2] - fround(f0);
				return;
			case 6:
				$d[base >> 3] = $d[base >> 3] - f0;
				return;
			case 7:
			default:
				err(E_NOSUPPORT);
		}
	}

	function visit() {
		var adj = 0;
		adj = (cute >>> 14) & 0x3Fc;
		ret = (ret + 4) >>> 0;
		_4[(rCall + ret) >> 2] = rParam;
		ret = (ret + 4) >>> 0;
		_4[(rCall + ret) >> 2] = op;
		rParam = (rParam + adj) >>> 0;
		op = (rCode + v0) >>> 0;
	}

	return {
		attrib: $_attrib,
		cls: $_cls,
		crash: $_crash,
		cycle: $_cycle,
		getRing: $_getRing,
		halt: $_halt,
		init: $_init,
		setRing: $_setRing
	};
}
