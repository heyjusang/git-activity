function drawTopContributors(parentId, options) {
  var defaults = {
    data : {}
  };
  options = $.extend(true,{},defaults,options);

  for (var i = 0; i < options.data.length; i++) {
    var contributor = options.data[i];
    var id = "contributor" + i;
    $(parentId).append('<div class="contributor" id="' + id + '"></div>');
    $("#"+id).append('<img class="contributor-image" src="images/contributor_default.png"></img>');
    $("#"+id).append('<div class="contributor-information"></div>');
    $("#"+id + " .contributor-information").append('<div class="contributor-name"></div>');
    $("#"+id + " .contributor-information").append('<div class="contributor-commit-count"></div>');
    $("#"+id + " .contributor-name").text(contributor.name);
    $("#"+id + " .contributor-commit-count").text(contributor.count);
  }
}
