Meteor.startup1(function () {Template.page.nodespec = function (fn) {

    var parts = [fn()];
    var replaceParts = function(regex, replacementFunc) {
      var newParts = [];
      _.each(parts, function (part) {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }
        regex.lastIndex = 0;
        var charsTaken = 0;
        var matchResult;
        while ((matchResult = regex.exec(part))) {
          var matchIndex = matchResult.index;
          if (matchIndex > charsTaken)
            newParts.push(part.substring(charsTaken, matchIndex));
          charsTaken = regex.lastIndex;
          var replacementParts = replacementFunc(matchResult);
          newParts.push.apply(newParts, _.toArray(replacementParts));
        }
        if (charsTaken < part.length)
          newParts.push(part.slice(charsTaken));
      });
      parts = newParts;
    };

    parts.unshift(['<div class="nodespec">']);
    parts.push(['</div>']);
    replaceParts(/".*?"/g, function (match) {
      return [['<span class="str">', Handlebars._escape(match[0]), '</span>']];
    });
    replaceParts(/`(.*?)`/g, function (match) {
      return [['<span class="token">', Handlebars._escape(match[1]), '</span>']];
    });
    replaceParts(/[A-Z]{3,}/g, function (match) {
      return [['<span class="tokentype">', Handlebars._escape(match[0]), '</span>']];
    });
    replaceParts(/[a-z]\w*/g, function (match) {
      return [['<span class="ref">', Handlebars._escape(match[0]), '</span>']];
    });
    replaceParts(/[\[\]()|.,*?]/g, function (match) {
      return [['<span class="punc">'], match[0], ['</span>']];
    });
    replaceParts(/,/g, function (match) {
      return [['<span class="comma">'], match[0], ['</span>']];
    });
    replaceParts(/\|/g, function (match) {
      return [['<span class="or">'], match[0], ['</span>']];
    });

    var html = _.map(parts, function (part) {
      if (typeof part === "string")
        return Handlebars._escape(part);
      return part.join('');
    }).join('');

    return new Handlebars.SafeString(html);
  };

  Template.page.spacer = function () {
    return new Handlebars.SafeString('<div class="spacer">&nbsp;</div>');
  };
	
    var N = 10;
    var numColors = 6;
    var colors = [];
    for(var z = 0; z < numColors; z++)
      colors[z] = z;

    var guid = 1;
	var a =0;
    var b =1;
    var c =9;
    var s =11;
    var z = 10;
    var w =2;


    var table = $('<table id="grid"></table>');
    $(table).appendTo("body");
	
	var makeCell = function (row) {
      var cells = row.cells;
      var tr = row.dom.elements()[0];
      var cell = {color: Random.choice(colors),
                  guid: String(guid++)};
      cell.dom = new UI.DomRange(cell);
      cells.push(cell);
      cell.dom.add(cell.guid, $('<td class="color' +
                                cell.color + '">' +
                                cell.color + '</td>'));
      row.content.add(cell.guid, cell);
    };
    
  }
  

if (Meteor.isClient) {
  Meteor.startup(function () {
    var N = 10;
    var numColors = 6;
    var colors = [];
    for(var z = 0; z < numColors; z++)
      colors[z] = z;

    var guid = 1;

    var table = $('<table id="grid"></table>');
    $(table).appendTo("body");
    var rows = [];
    var tableContent = new UI.DomRange;
    var makeCell = function (row) {
      var cells = row.cells;
      var tr = row.dom.elements()[0];
      var cell = {color: Random.choice(colors),
                  guid: String(guid++)};
      cell.dom = new UI.DomRange(cell);
      cells.push(cell);
      cell.dom.add(cell.guid, $('<td class="color' +
                                cell.color + '">' +
                                cell.color + '</td>'));
      row.content.add(cell.guid, cell);
    };
    var makeRow = function () {
      var row = {cells: [], guid: String(guid++),
                 content: new UI.DomRange};
      row.dom = new UI.DomRange(row);
      rows.push(row);
      tableContent.add(row.guid, row);
      var tr = $("<tr></tr>")[0];
      row.dom.add(tr);
      UI.DomRange.insert(row.content, tr);
      var cells = row.cells;
      for(var c = 0; c < N; c++)
        makeCell(row);
    };
    for (var r = 0; r < N; r++)
      makeRow();

    UI.DomRange.insert(tableContent, table[0]);

    $(document).on('keydown', function (evt) {
      var deltaN = 0;
      var deltaC = 0;
      if (evt.which === 38) {
        deltaN = 1; // up
      } else if (evt.which === 40) {
        deltaN = -1; // down
      } else if (evt.which === 37) {
        deltaC = -1; // left
      } else if (evt.which === 39) {
        deltaC = 1; // right
      } else if (evt.which === 32) {
        // spacebar
        var row0 = rows.shift();
        rows.push(row0);
        tableContent.moveBefore(row0.guid, null);
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          var cell0 = row.cells.shift();
          row.cells.push(cell0);
          row.content.moveBefore(cell0.guid, null);
        }
      }

      if (deltaN === 1) {
        N += 1;
        for (var i = 0; i < N - 1; i++)
          // lengthen old rows
          makeCell(rows[i]);
        makeRow();
      } else if (deltaN === -1) {
        if (N === 0)
          return;
        N -= 1;
        tableContent.remove(rows[N].guid);
        rows.length = N;
        for (var i = 0; i < N; i++) {
          var row = rows[i];
          row.content.remove(row.cells[N].guid);
          rows[i].cells.length = N;
        }
      }

      if (deltaC) {
        for (var r = 0; r < N; r++) {
          var row = rows[r];
          for (var c = 0; c < N; c++) {
            var cell = row.cells[c];
            var td = cell.dom.elements()[0];
            var color =
                  (cell.color =
                   (cell.color + deltaC + numColors)
                   % numColors);
            td.innerHTML = color;
            td.className = 'color' + color;
          }
        }
      }
    });
  });
}
