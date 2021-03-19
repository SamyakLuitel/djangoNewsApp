$(document).ready(function() {
    console.log('ready!');
    el = document.getElementsByClassName('text-muted')
    for (i =0; i<el.length; i++){
        t= document.getElementsByClassName('text-muted')[i].innerText
        var d = new Date(t);
        document.getElementsByClassName('text-muted')[i].innertext =d.toDateString()
    }
});

var page = 2;
var window_scroll = true;
var search ='{{ search }}';


window.addEventListener('scroll', function(e){
// scroll check 
    console.log('scroll check...')
    if(window_scroll){
        if((window.innerHeight + window.scrollY) >= (document.body.scrollHeight-200)){
            window_scroll =false;
            document.getElementById('loading').style.dislpay = "block";
            $.ajax({
                url:'/next?page=' +page +'&search=' + search,
                datatype:'json',
                success: function(data){
                    if(data["success"]){
                        articles = data["data"]
                        articles_html =''
                        for (i =0;i< articles.length; i++){
                            articles_html +='\
                            <div class ="card mb-3 box" style = "max-width: 640px; margin:auto;">\
                                <div> class="row">\
                                    <div class="col-md-8">\
                                        <div class="card-body">\
                                            <h5 class="card-title"><a href="'+ articles[i]["description"] + '</p>\
                                        </div>\
                                    </div>\
                                        \
                                    <div class="col-md-4 img-box">\
                                        <img src="'+ articles[i]["image"]+'" class ="card-img" alt="..." height="100%">\
                                    </div>\
                                </div>\
                            </div>\
                            '
                        }
                        $("#articles-container").append(articles_html);
                        page+=1;
                        window_scroll = true;
                        document.getElementById("loading").style.dislpay ="none";
                    }
                    else{
                        console.log("failed")
                        window_scroll =true;
                        document.getElementById("loading").style.display ="none";
                    }
                }
            });
        }
    }

})