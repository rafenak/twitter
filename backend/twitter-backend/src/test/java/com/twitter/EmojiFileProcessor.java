package com.twitter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EmojiFileProcessor {


    public void test() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        objectMapper.configure(SerializationFeature.WRITE_SINGLE_ELEM_ARRAYS_UNWRAPPED, true);
        objectMapper.configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, false);


        try {
            // Read the original JSON file
            Map<String, List<Map<String, Object>>> originalData = objectMapper.readValue(
                    new File("/Users/nakhuda1/Downloads/original_emojis.json"),
                    new TypeReference<Map<String, List<Map<String, Object>>>>() {
                    });

            // Prepare a map to hold combined emojis by base name
            Map<String, Map<String, Object>> combinedEmojis = new HashMap<>();

            // Process each emoji
            for (Map<String, Object> emoji : originalData.get("emojis")) {
                String name = (String) emoji.get("name");
                String baseName = name.split(":")[0].trim(); // Get base name without skin tone

                // Initialize the entry if it doesn't exist
                Map<String, Object> combined = combinedEmojis.getOrDefault(baseName, new HashMap<>());

                // Set common properties if it's the first occurrence
                if (!combinedEmojis.containsKey(baseName)) {
                    combined.put("emoji", emoji.get("emoji")); // Default emoji
                    combined.put("name", baseName);
                    combined.put("category", emoji.get("category"));
                    combined.put("subcategory", emoji.get("subcategory"));

                    // Extract the support information
//                    Map<String, Object> support = (Map<String, Object>) emoji.get("support");
//                    combined.put("support", support);

                    // Initialize the images list
                    List<String> imageList = new ArrayList<>();
                    Map<String, Object> images = (Map<String, Object>) emoji.get("images");

                    // Add an image if it exists and is not a boolean
                    if (images != null) {
                        for (Map.Entry<String, Object> entry : images.entrySet()) {
                            if (entry.getValue() instanceof String) {
                                // Add the first image found
                                imageList.add((String) entry.getValue());
                                break; // Only take one image
                            }
                        }
                    }
                    combined.put("images", imageList); // Use an array instead of an object
                    combined.put("modifiers", new ArrayList<String>()); // Initialize modifiers
                }

                // Check for skin tone and add the emoji to modifiers
                if (name.contains("skin tone")) {
                    List<String> modifiers = (List<String>) combined.get("modifiers");
                    modifiers.add((String) emoji.get("emoji")); // Add the skin tone emoji
                }

                //System.out.println("Emoji: " + emoji.get("emoji")); // Debug output

                // Update the combinedEmojis map
                combinedEmojis.put(baseName, combined);
            }

            // Create the final JSON structure
            List<Map<String, Object>> finalEmojis = new ArrayList<>(combinedEmojis.values());
            Map<String, Object> finalJson = new HashMap<>();
            finalJson.put("emojis", finalEmojis);

            // Write the new JSON file
            //objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File("/Users/nakhuda1/Desktop/Work/Development/Personal/EmojiConvertorProcess/output/combined_emojis.json"), finalJson);

            // Write the new JSON file with UTF-8 encoding
            try (Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("/Users/nakhuda1/Desktop/Work/Development/Personal/EmojiConvertorProcess/output/combined_emojis.json"), StandardCharsets.UTF_8))) {
                objectMapper.writerWithDefaultPrettyPrinter().writeValue(writer, finalJson);
            }


            System.out.println("Combined JSON structure created successfully in 'combined_emojis.json'.");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
