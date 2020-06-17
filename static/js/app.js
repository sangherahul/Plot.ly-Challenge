

d3.json("samples.json").then(data=> {
    
    // console.log(data)
    var metadata = data.metadata;
    // console.log(metadata[0].wfreq);

    var freq = metadata.map(element=> element.wfreq);

    // console.log(freq);

    

    var panel1 = d3.selectAll('#sample-metadata')
    

    var names = data.names;
    // console.log(names);

    var subject_id = d3.select("#selDataset");

    names.map(element => {

        subject_id.append("option").text(element);
    });

    var samples = data.samples;
    // console.log(samples);

    subject_id.on("change", load_dashboard);

    

    function load_dashboard(){

        var patient_id = d3.event.target.value;
        for (var x=0; x<metadata.length; x++){

            if ( patient_id == metadata[x].id){

                var element1 = document.getElementById("parent")
                element1.remove();
                var panel = panel1.append("div").attr("id","parent");

                panel.append("div").text(`id : ${metadata[x].id}`).attr("id","panel_Data");
                panel.append("div").text(`ethnicity : ${metadata[x].ethnicity}`).attr("id","panel_Data");
                panel.append("div").text(`gender : ${metadata[x].gender}`).attr("id","panel_Data");
                panel.append("div").text(`age : ${metadata[x].age}`).attr("id","panel_Data");
                panel.append("div").text(`location : ${metadata[x].location}`).attr("id","panel_Data");
                panel.append("div").text(`bbtype : ${metadata[x].bbtype}`).attr("id","panel_Data");
                panel.append("div").text(`wfreq : ${metadata[x].wfreq}`).attr("id","panel_Data");

                
            }
        };


        var x_axis_bar = [];

        var y_labels_bar = [];
        var hover_labels_bar = [];

        var x_axis_bb =[];
        var y_axis_bb =[];
        var marker_size_bb = [];
        var hover_labels_bb = [];

        for (var x=0; x<samples.length; x++){

            if (patient_id == samples[x].id){

                // console.log(element);
    
                x_axis_bar = samples[x].sample_values.slice(0,10);
                y_labels_bar = samples[x].otu_ids.slice(0,10).map(String);
    
                y_labels_bar = y_labels_bar.map(function(element){
    
                return(`OTU ${element}`)
                })
                
                // console.log(y_labels);
                
                hover_labels_bar = samples[x].otu_labels.slice(0,10);
    
                // console.log(hover_labels);
                Plotly.restyle("bar","x",[x_axis_bar]);
                Plotly.restyle("bar", "y", [y_labels_bar]);
                Plotly.restyle("bar", "text", [hover_labels_bar])
    
                

                x_axis_bb = samples[x].otu_ids;
                y_axis_bb = samples[x].sample_values.map(String);
    
                marker_size_bb = samples[x].sample_values;
                hover_labels_bb = samples[x].otu_labels;


                var data = [{
                    mode: 'markers',
                    x: x_axis_bb,
                    y: y_axis_bb,
                    marker:{
                        size: marker_size_bb
                    },
    
                    transforms: [{ type: "groupby", groups: x_axis_bb }],
                    text: hover_labels_bb,textposition: 'auto',
                }];
        
                Plotly.newPlot("bubble",data);

                Plotly.restyle('gauge', "value", [freq[x]]);


            };


        }





        

        
    };

    initialize_dashboard(names[0]);
    function initialize_dashboard(patient_id){

        


    
        var panel = panel1.append("div").attr("id","parent");
        // console.log(panel);


        
        for (var x=0; x<metadata.length; x++){

            if ( patient_id == metadata[x].id){

                var element1 = document.getElementById("parent")
                element1.remove();
                var panel = panel1.append("div").attr("id","parent");

                panel.append("div").text(`id : ${metadata[x].id}`).attr("id","panel_Data");
                panel.append("div").text(`ethnicity : ${metadata[x].ethnicity}`).attr("id","panel_Data");
                panel.append("div").text(`gender : ${metadata[x].gender}`).attr("id","panel_Data");
                panel.append("div").text(`age : ${metadata[x].age}`).attr("id","panel_Data");
                panel.append("div").text(`location : ${metadata[x].location}`).attr("id","panel_Data");
                panel.append("div").text(`bbtype : ${metadata[x].bbtype}`).attr("id","panel_Data");
                panel.append("div").text(`wfreq : ${metadata[x].wfreq}`).attr("id","panel_Data");

                
            }
        };


        var x_axis_bar = [];

        var y_labels_bar = [];
        var hover_labels_bar = [];

        var x_axis_bb =[];
        var y_axis_bb =[];
        var marker_size_bb = [];
        var hover_labels_bb = [];

        for (var x=0; x<samples.length; x++){

            if (patient_id == samples[x].id){

                // console.log(element);
    
                x_axis_bar = samples[x].sample_values.slice(0,10);
                y_labels_bar = samples[x].otu_ids.slice(0,10).map(String);
    
                y_labels_bar = y_labels_bar.map(function(element){
    
                return(`OTU ${element}`)
                })
                
                // console.log(y_labels);
                
                hover_labels_bar = samples[x].otu_labels.slice(0,10);

                var data1 = [{
                            type : 'bar',
                            x: x_axis_bar,
                            y: y_labels_bar,
                            text: hover_labels_bar,
                            // text: y_labels_bar.map(String),textposition: 'auto',
                            orientation: 'h'
                        }]
                
                        var layout = {
                            yaxis: {
                                type:"category", 
                                autorange: "reversed"
                            }
                        };
                
                        Plotly.newPlot("bar",data1, layout)
    
                // console.log(hover_labels);
                // Plotly.new("bar","x",[x_axis_bar]);
                // Plotly.restyle("bar", "y", [y_labels_bar]);
                // Plotly.restyle("bar", "text", [hover_labels_bar])
    
                

                x_axis_bb = samples[x].otu_ids;
                y_axis_bb = samples[x].sample_values.map(String);
    
                marker_size_bb = samples[x].sample_values;
                hover_labels_bb = samples[x].otu_labels;


                var data = [{
                    mode: 'markers',
                    x: x_axis_bb,
                    y: y_axis_bb,
                    marker:{
                        size: marker_size_bb
                    },
    
                    transforms: [{ type: "groupby", groups: x_axis_bb }],
                    text: hover_labels_bb,textposition: 'auto',
                }];
        
                Plotly.newPlot("bubble",data);


                var data = [
                    {
                        domain: { x: [0, 1], y: [0, 1] },
                        value: freq[x],
                        title: { text: "Belly Button Washing frequency" },
                        type: "indicator",
                        mode: "gauge+number",
                        gauge: {axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" }}
                    }
                ];
                
                var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
                Plotly.newPlot('gauge', data, layout);

            };


        }





        

        
    };


});