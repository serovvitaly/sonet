<?php

class Parser_Controller extends Base_Controller
{
    
    public function after($request)
    {
        $request->header('Content-Type', 'text/plain');
    }
    
    public function action_index()
    {
        return;
        
        $file = $_SERVER['DOCUMENT_ROOT'] . '/source/parse/noname33.xml';
        
        $xml = simplexml_load_file($file);
        
        //print_r($xml->tbody->tr);
        $mixes = array();
        foreach ($xml->tbody->tr AS $trs) {
            $tds = $trs->td;
            if (count($tds) > 0) {
                $mix = array(
                    'name'        => (string) $tds[0],
                    'articul'     => (string) $tds[2],
                    'description' => (string) $tds[1],
                    'price'       => (double) $tds[8],
                    'category_id' => 2,
                    
                    'attr_cloth_width' => (string) $tds[1],
                );
                
                Good::create($mix);
            }
        }
        
        
        
        //print_r($mixes);
        
        //
    }
    
}